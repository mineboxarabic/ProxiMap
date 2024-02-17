import AskedService, { AskedServiceInterface } from "../Models/AskedService.js";
import mongoose from "mongoose";

interface AskedServiceDAOInterface {
    create(askedService: AskedServiceInterface): Promise<AskedServiceInterface>;
    findById(id: string): Promise<AskedServiceInterface>;
    findByPartnerId(id: string): Promise<AskedServiceInterface>;
    deleteById(id: string): Promise<AskedServiceInterface>;
    updateById(id: string, askedService: AskedServiceInterface): Promise<AskedServiceInterface>;
    findAll(): Promise<AskedServiceInterface>;
    findAskedServicesinMapView(swLat: string, swLng: string, neLat: string, neLng: string, query: any): Promise<AskedServiceInterface>;
    findAskedServicesinMapViewOfUser(swLat: string, swLng: string, neLat: string, neLng: string, id: string): Promise<AskedServiceInterface>;
    findAllByPartnerId(id: string): Promise<AskedServiceInterface>;
    //Create a function to know if a asked service is exist
    exists(id: string): Promise<boolean>;
    isValidCoordinate(lat: GLfloat, lng: GLfloat): boolean;
}

class AskedServiceDAO  implements AskedServiceDAOInterface {
    async create(askedService: AskedServiceInterface) : Promise<AskedServiceInterface>
    {
        const newAskedService = new AskedService(askedService);
        return await newAskedService.save().catch((error) => { return error; });
    }

    async findById(id: string) : Promise<AskedServiceInterface> 
    {
        return await AskedService.findById(id).catch((error) => { return error; });
    }

    
    async exists(id: string): Promise<boolean> {
        return await AskedService.exists({ _id: id }) !== null;
    }

    async findByPartnerId(id: string) : Promise<AskedServiceInterface> 
    {
        return await AskedService.find({partnerId: id}).catch((error) => { return error; });
    }

    async deleteById(id: string) : Promise<AskedServiceInterface> 
    {
        return await AskedService.findByIdAndDelete(id).catch((error) => { return error; });
    }

    async updateById(id: string, askedService: AskedServiceInterface) : Promise<AskedServiceInterface>
    {
        return await AskedService.findByIdAndUpdate(id, askedService).catch((error) => { return error; });
    }

    async findAll() {
        const aggregationPipeline = [
            {
                $lookup: {
                    from: "users",        // 'users' should be your collection name of User in MongoDB
                    localField: "partnerId",
                    foreignField: "_id",
                    as: "partnerDetails",
                }
            },
            {
                $lookup:{
                    from: "categories",        // 'categories' should be your collection name of Category in MongoDB
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails",
                }
            }
        ];
        return await AskedService.aggregate(aggregationPipeline).catch((error) => { return error; });
    }


    async findAskedServicesinMapView(swLat: string, swLng: string, neLat: string, neLng: string, query: any) : Promise<AskedServiceInterface> 
     {
        const swLat_p = parseFloat(swLat);
        const swLng_p = parseFloat(swLng);
        const neLat_p = parseFloat(neLat);
        const neLng_p = parseFloat(neLng);

        const { categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus } = query;

        console.log(parseFloat(priceRange.split(',')[0]), parseFloat(priceRange.split(',')[1]));



        try {

            const aggregationPipeline = [
                {
                    $match: {
                        position: {
                            $geoWithin: {
                                $box: [
                                    [swLng_p, swLat_p],
                                    [neLng_p, neLat_p]
                                ]
                            }
                        },
                   
                        //Find by category
                        // @ts-expect-error TS(2552): Cannot find name 'ObjectId'. Did you mean 'Object'... Remove this comment to see the full error message
                        ...(categoryId != '' && { categoryId: new ObjectId(categoryId) }),
                        //Find by price range
                        ...(priceRange && priceRange.includes(',') && {
                            price: {
                                $gte: parseFloat(priceRange.split(',')[0]),
                                $lte: parseFloat(priceRange.split(',')[1])
                            }
                        }),
                        //Find by availability
                        //...(availability != '' && { availability: availability === 'true' }),
                        //Find by status
                        ...(serviceStatus != '' && { status: serviceStatus }),
                        //Find by Service Type
                        ...(serviceType != '' && {
                            $or: [
                                { name: { $regex: serviceType, $options: 'i' } },
                                { description: { $regex: serviceType, $options: 'i' } }
                            ]
                        })


                    }
                },
                {
                    $lookup: {
                        from: "users",        // Replace with your users collection name
                        localField: "userId",
                        foreignField: "_id",
                        as: "usersDetails"
                    }
                
                },
                {
                    $lookup: {
                        from: "categories",        // Replace with your categories collection name
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                }
            ];

    
            const services :  any = await AskedService.aggregate(aggregationPipeline);
            console.log('ser',services.length);
            return services;

        } catch (error) {
            console.log(swLat_p, swLng_p, neLat_p, neLng_p);
            console.error("Error in findServicesinMapView:", error);
            throw error; // Re-throw the error for handling at a higher level
        }
    }


    async findAskedServicesinMapViewOfUser(swLat: string, swLng: string, neLat: string, neLng: string, id: string) : Promise<AskedServiceInterface>
    {
        try {
            // Parse coordinates to floats
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);

            // Check if coordinates are valid
            if (!this.isValidCoordinate(swLat_p, swLng_p) || !this.isValidCoordinate(neLat_p, neLng_p)) {
                throw new Error('Invalid coordinates');
            }

            // Validate and create ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ObjectId');
            }

            const idObject = new mongoose.Types.ObjectId(id);

            // Define the aggregation pipeline
            const aggregationPipeline = [
                {
                    $match: {
                        partnerId: idObject,
                        position: {
                            $geoWithin: {
                                $box: [
                                    [swLng_p, swLat_p],
                                    [neLng_p, neLat_p]
                                ]
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "users",        // Replace with your users collection name
                        localField: "partnerId",
                        foreignField: "_id",
                        as: "partnerDetails"
                    }
                },
                {
                    $lookup: {
                        from: "categories",    // Replace with your categories collection name
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                }
            ];

            // Execute the aggregation pipeline
            const askedServices : any
            = await AskedService.aggregate(aggregationPipeline);

            return askedServices;
        } catch (error) {
            console.error("Error in findAskedServicesinMapViewOfUser:", error);
            throw error; // Re-throw the error for handling at a higher level
        }
    }

    async findAllByPartnerId(id: string)  : Promise<AskedServiceInterface>
    {
        return await AskedService.find({userId: id}).catch((error) => { return error; });
    }
    isValidCoordinate(lat: GLfloat, lng: GLfloat) : boolean
    {
        return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    }
} 

export default AskedServiceDAO;
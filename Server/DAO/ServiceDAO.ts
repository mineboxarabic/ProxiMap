import Service, { ServiceInterface } from "../Models/Service.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import DatabaseError from "./DataBaseError/DatabaseError.js";

interface ServiceDAOInterface {
    create(service: ServiceInterface): Promise<ServiceResult>; //Promice of ServiceInterface or an error
    findById(id: string): Promise<ServiceResult>;
    findByPartnerId(id: string): Promise<ServiceArrayResult>;
    deleteById(id: string): Promise<ServiceResult>;
    updateById(id: string, service: ServiceInterface): Promise<ServiceResult>;
    findAll(): Promise<ServiceArrayResult>;
    findServicesinMapView(swLat: string, swLng: string, neLat: string, neLng: string, query: any): Promise<ServiceArrayResult>;
    findServicesinMapViewOfUser(swLat: string, swLng: string, neLat: string, neLng: string, id: string): Promise<ServiceArrayResult>;
    findAllByPartnerId(id: string): Promise<ServiceArrayResult>;
    isValidCoordinate(lat: GLfloat, lng: GLfloat): boolean;
    exists(id: string): Promise<boolean>;
    updateMany(services: any): Promise<ServiceArrayResult>; // Specify the type more precisely if possible
}
type ServiceResult = ServiceInterface | DatabaseError | null;

type ServiceArrayResult = ServiceInterface[] | DatabaseError | null;

class ServiceDAO  implements ServiceDAOInterface{
    async exists(id: string): Promise<boolean> {
        return (await Service.exists({ _id: id })) !== null;

    }
    async create(service: ServiceInterface): Promise<ServiceResult> {
       /* const newService = new Service(service);
        return await newService.save().catch((error) => { return error; });*/
        try {
            const newService = new Service(service);
            const result = await newService.save();
            return result;
        } catch (error) {
            return new DatabaseError('Error creating service', error);
        }
    }

    async findById(id: string)  : Promise<ServiceResult> {
    
        //return await Service.findById(id).catch((error) => { return error; });
        try {
            const service = await Service.findById(id);
            return service;
        } catch (error) {
            return new DatabaseError('Error finding service by ID', error);
        }
    }

    async findByPartnerId(id: string) : Promise<ServiceArrayResult> {
        //return await Service.find({partnerId: id}).catch((error) => { return error; });

        try {
            const service = await Service.find({ partnerId: id });
            return service;
        } catch (error) {
            return new DatabaseError('Error finding service by partner ID', error);
        }
    }

    async deleteById(id: string) : Promise<ServiceResult> {
       // return await Service.findByIdAndDelete(id).catch((error) => { return error; });
        try {
            const service = await Service.findByIdAndDelete(id);
            return service;
        } catch (error) {
            return new DatabaseError('Error deleting service by ID', error);
        }
    }

    async updateById(id: string, service: ServiceInterface) : Promise<ServiceResult> {
       // return await Service.findByIdAndUpdate(id, service).catch((error) => { return error; });
        try {
            const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
            return updatedService;
        } catch (error) {
            return new DatabaseError('Error updating service by ID', error);
        }

    }

    async findAll()  : Promise<ServiceArrayResult>{
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
       // return await Service.aggregate(aggregationPipeline).catch((error) => { return error; });
        try {
            const services = await Service.aggregate(aggregationPipeline);
            return services;
        } catch (error) {
            return new DatabaseError('Error finding all services', error);
        }
    }


    async findServicesinMapView(swLat: string, swLng: string, neLat: string, neLng: string, query: any) : Promise<ServiceArrayResult>{
        const swLat_p = parseFloat(swLat);
        const swLng_p = parseFloat(swLng);
        const neLat_p = parseFloat(neLat);
        const neLng_p = parseFloat(neLng);

        const { categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus } = query;

       // console.log(parseFloat(priceRange.split(',')[0]), parseFloat(priceRange.split(',')[1]));



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
                        ...(categoryId != '' && { categoryId: new ObjectId(categoryId) }),
                        //Find by price range
                        ...(priceRange && priceRange.includes(',') && {
                            price: {
                                $gte: parseFloat(priceRange.split(',')[0]),
                                $lte: parseFloat(priceRange.split(',')[1])
                            }
                        }),
                        //Find by availability
                        ...(availability != '' && { availability: availability === 'true' }),
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
                        localField: "partnerId",
                        foreignField: "_id",
                        as: "partnerDetails"
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

    
            const services = await Service.aggregate(aggregationPipeline);
           // console.log('size:', services.length);
            return services;
        } catch (error) {
            console.log(swLat_p, swLng_p, neLat_p, neLng_p);
            console.error("Error in findServicesinMapView:", error);
            return [];
        }
    }

    async findServicesinMapViewOfUser(swLat: string, swLng: string, neLat: string, neLng: string, id: string): Promise<ServiceArrayResult> {
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
            const services = await Service.aggregate(aggregationPipeline);
            console.log('size:', services.length);
            return services;
        } catch (error) {
            console.error("Error in findServicesinMapViewOfUser:", error);
            throw error; // Re-throw the error for handling at a higher level
        }
    }

    async findAllByPartnerId(id: string) : Promise<ServiceArrayResult> {

        try {
            const services = await Service.find({ partnerId: id });
            return services;
        } catch (error) {
            return new DatabaseError('Error finding all services by partner ID', error);
        }
    }
    isValidCoordinate(lat: GLfloat, lng: GLfloat): boolean {
        return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    }

    async updateMany(services: any)  : Promise<ServiceArrayResult>{
       // return await Service.updateMany(services).catch((error) => { return error; });
        try {
            const updatedServices = await Service.updateMany(services);
            return updatedServices;
        } catch (error) {
            return new DatabaseError('Error updating many services', error);
        }
    }
} 

export default ServiceDAO;
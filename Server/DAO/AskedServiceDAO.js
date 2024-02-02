import AskedService from "../Models/AskedService.js";
import mongoose from "mongoose";

class AskedServiceDAO {
    async create(askedService) {
        const newAskedService = new AskedService(askedService);
        return await newAskedService.save().catch((error) => { return error; });
    }

    async findById(id) {
        return await AskedService.findById(id).catch((error) => { return error; });
    }

    async findByPartnerId(id) {
        return await AskedService.find({partnerId: id}).catch((error) => { return error; });
    }

    async deleteById(id) {
        return await AskedService.findByIdAndDelete(id).catch((error) => { return error; });
    }

    async updateById(id, askedService) {
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


    async findAskedServicesinMapView(swLat, swLng, neLat, neLng) {
        try {
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);
           // console.log(swLat_p, swLng_p, neLat_p, neLng_p);
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
                        from: "categories",        // Replace with your categories collection name
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                }
            ];

    
            const askedServices = await AskedService.aggregate(aggregationPipeline);
            return askedServices;
        } catch (error) {
            console.error("Error in findAskedServicesinMapView:", error);
            return error;
        }
    }

    async findAskedServicesinMapViewOfUser(swLat, swLng, neLat, neLng, id) {
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
            const askedServices = await AskedService.aggregate(aggregationPipeline);

            return askedServices;
        } catch (error) {
            console.error("Error in findAskedServicesinMapViewOfUser:", error);
            throw error; // Re-throw the error for handling at a higher level
        }
    }

    async findAllByPartnerId(id) {
        return await AskedService.find({userId: id}).catch((error) => { return error; });
    }
    isValidCoordinate(lat, lng) {
        return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    }
} 

export default AskedServiceDAO;
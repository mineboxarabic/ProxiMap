import Service from "../Models/Service.js";
import mongoose from "mongoose";

class ServiceDAO {
    async create(service) {
        const newService = new Service(service);
        return await newService.save().catch((error) => { return error; });
    }

    async findById(id) {
        return await Service.findById(id).catch((error) => { return error; });
    }

    async findByPartnerId(id) {
        return await Service.find({partnerId: id}).catch((error) => { return error; });
    }

    async deleteById(id) {
        return await Service.findByIdAndDelete(id).catch((error) => { return error; });
    }

    async updateById(id, service) {
        return await Service.findByIdAndUpdate(id, service).catch((error) => { return error; });
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
        return await Service.aggregate(aggregationPipeline).catch((error) => { return error; });
    }


    async findServicesinMapView(swLat, swLng, neLat, neLng) {
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

    
            const services = await Service.aggregate(aggregationPipeline);
            return services;
        } catch (error) {
            console.error("Error in findServicesinMapView:", error);
            return error;
        }
    }

    async findServicesinMapViewOfUser(swLat, swLng, neLat, neLng, id) {
        try {
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);

            // Check if coordinates are valid
            if (!this.isValidCoordinate(swLat_p, swLng_p) || !this.isValidCoordinate(neLat_p, neLng_p)) {
                console.log(swLat_p, swLng_p, neLat_p, neLng_p);
                throw new Error('Invalid coordinates');
            }

            // Validate and create ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ObjectId');
            }


            const idObject = new mongoose.Types.ObjectId(id);

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
                        from: "categories",        // Replace with your categories collection name
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                }
            ];

    
            const services = await Service.aggregate(aggregationPipeline);
            return services;
        } catch (error) {
            console.error("Error in findServicesinMapViewOfUser:", error);
            return error;
        }
    }
    isValidCoordinate(lat, lng) {
        return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    }
} 

export default ServiceDAO;
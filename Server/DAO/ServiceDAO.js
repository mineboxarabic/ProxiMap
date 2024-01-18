import Service from "../Models/Service.js";

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
            }
        ];
        return await Service.aggregate(aggregationPipeline).catch((error) => { return error; });
    }

    async findServicesinMapView(swLat, swLng, neLat, neLng) {
        try {
            swLat = parseFloat(swLat);
            swLng = parseFloat(swLng);
            neLat = parseFloat(neLat);
            neLng = parseFloat(neLng);
    
            const aggregationPipeline = [
                {
                    $match: {
                        position: {
                            $geoWithin: {
                                $box: [
                                    [swLng, swLat],
                                    [neLng, neLat]
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
                }
            ];
    
            const services = await Service.aggregate(aggregationPipeline);
    
            return services;
        } catch (error) {
            console.error("Error in findServicesinMapView:", error);
            return error;
        }
    }

} 

export default ServiceDAO;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Service from "../Models/Service.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
class ServiceDAO {
    create(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const newService = new Service(service);
            return yield newService.save().catch((error) => { return error; });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.findById(id).catch((error) => { return error; });
        });
    }
    findByPartnerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.find({ partnerId: id }).catch((error) => { return error; });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.findByIdAndDelete(id).catch((error) => { return error; });
        });
    }
    updateById(id, service) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.findByIdAndUpdate(id, service).catch((error) => { return error; });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const aggregationPipeline = [
                {
                    $lookup: {
                        from: "users", // 'users' should be your collection name of User in MongoDB
                        localField: "partnerId",
                        foreignField: "_id",
                        as: "partnerDetails",
                    }
                },
                {
                    $lookup: {
                        from: "categories", // 'categories' should be your collection name of Category in MongoDB
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails",
                    }
                }
            ];
            return yield Service.aggregate(aggregationPipeline).catch((error) => { return error; });
        });
    }
    findServicesinMapView(swLat, swLng, neLat, neLng, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);
            const { categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus } = query;
            // console.log(parseFloat(priceRange.split(',')[0]), parseFloat(priceRange.split(',')[1]));
            try {
                const aggregationPipeline = [
                    {
                        $match: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ position: {
                                $geoWithin: {
                                    $box: [
                                        [swLng_p, swLat_p],
                                        [neLng_p, neLat_p]
                                    ]
                                }
                            } }, (categoryId != '' && { categoryId: new ObjectId(categoryId) })), (priceRange && priceRange.includes(',') && {
                            price: {
                                $gte: parseFloat(priceRange.split(',')[0]),
                                $lte: parseFloat(priceRange.split(',')[1])
                            }
                        })), (availability != '' && { availability: availability === 'true' })), (serviceStatus != '' && { status: serviceStatus })), (serviceType != '' && {
                            $or: [
                                { name: { $regex: serviceType, $options: 'i' } },
                                { description: { $regex: serviceType, $options: 'i' } }
                            ]
                        }))
                    },
                    {
                        $lookup: {
                            from: "users", // Replace with your users collection name
                            localField: "partnerId",
                            foreignField: "_id",
                            as: "partnerDetails"
                        }
                    },
                    {
                        $lookup: {
                            from: "categories", // Replace with your categories collection name
                            localField: "categoryId",
                            foreignField: "_id",
                            as: "categoryDetails"
                        }
                    }
                ];
                const services = yield Service.aggregate(aggregationPipeline);
                // console.log('size:', services.length);
                return services;
            }
            catch (error) {
                console.log(swLat_p, swLng_p, neLat_p, neLng_p);
                console.error("Error in findServicesinMapView:", error);
                return [];
            }
        });
    }
    findServicesinMapViewOfUser(swLat, swLng, neLat, neLng, id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            from: "users", // Replace with your users collection name
                            localField: "partnerId",
                            foreignField: "_id",
                            as: "partnerDetails"
                        }
                    },
                    {
                        $lookup: {
                            from: "categories", // Replace with your categories collection name
                            localField: "categoryId",
                            foreignField: "_id",
                            as: "categoryDetails"
                        }
                    }
                ];
                // Execute the aggregation pipeline
                const services = yield Service.aggregate(aggregationPipeline);
                console.log('size:', services.length);
                return services;
            }
            catch (error) {
                console.error("Error in findServicesinMapViewOfUser:", error);
                throw error; // Re-throw the error for handling at a higher level
            }
        });
    }
    findAllByPartnerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.find({ partnerId: id }).catch((error) => { return error; });
        });
    }
    isValidCoordinate(lat, lng) {
        return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    }
    updateMany(services) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service.updateMany(services).catch((error) => { return error; });
        });
    }
}
export default ServiceDAO;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AskedService from "../Models/AskedService.js";
import mongoose from "mongoose";
import DatabaseError from "./DataBaseError/DatabaseError.js";
class AskedServiceDAO {
    create(askedService) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAskedService = new AskedService(askedService);
                const savedAskedService = yield newAskedService.save();
                return savedAskedService;
            }
            catch (error) {
                return new DatabaseError("Failed to create service", error);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const askedService = yield AskedService.findById(id);
                return askedService;
            }
            catch (error) {
                return new DatabaseError("Failed to find service", error);
            }
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield AskedService.exists({ _id: id })) !== null;
        });
    }
    findByPartnerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const askedService = yield AskedService.find({ partnerId: id });
                return askedService;
            }
            catch (error) {
                return new DatabaseError("Failed to find service", error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const askedService = yield AskedService.findByIdAndDelete(id);
                return askedService;
            }
            catch (error) {
                return new DatabaseError("Failed to delete service", error);
            }
        });
    }
    updateById(id, askedService) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAskedService = yield AskedService.findByIdAndUpdate(id, askedService);
                return updatedAskedService;
            }
            catch (error) {
                return new DatabaseError("Failed to update service", error);
            }
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
                    },
                },
                {
                    $lookup: {
                        from: "categories", // 'categories' should be your collection name of Category in MongoDB
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryDetails",
                    },
                },
            ];
            //  return await AskedService.aggregate(aggregationPipeline).catch((error) => { return error; });
            try {
                const askedServices = yield AskedService.aggregate(aggregationPipeline);
                return askedServices;
            }
            catch (error) {
                return new DatabaseError("Failed to find services", error);
            }
        });
    }
    findAskedServicesinMapView(swLat, swLng, neLat, neLng, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);
            const { categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus, } = query;
            console.log(parseFloat(priceRange.split(",")[0]), parseFloat(priceRange.split(",")[1]));
            try {
                const aggregationPipeline = [
                    {
                        $match: Object.assign(Object.assign(Object.assign(Object.assign({ position: {
                                $geoWithin: {
                                    $box: [
                                        [swLng_p, swLat_p],
                                        [neLng_p, neLat_p],
                                    ],
                                },
                            } }, (categoryId != "" && { categoryId: new ObjectId(categoryId) })), (priceRange &&
                            priceRange.includes(",") && {
                            price: {
                                $gte: parseFloat(priceRange.split(",")[0]),
                                $lte: parseFloat(priceRange.split(",")[1]),
                            },
                        })), (serviceStatus != "" && { status: serviceStatus })), (serviceType != "" && {
                            $or: [
                                { name: { $regex: serviceType, $options: "i" } },
                                { description: { $regex: serviceType, $options: "i" } },
                            ],
                        })),
                    },
                    {
                        $lookup: {
                            from: "users", // Replace with your users collection name
                            localField: "userId",
                            foreignField: "_id",
                            as: "usersDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "categories", // Replace with your categories collection name
                            localField: "categoryId",
                            foreignField: "_id",
                            as: "categoryDetails",
                        },
                    },
                ];
                const services = yield AskedService.aggregate(aggregationPipeline);
                console.log("ser", services.length);
                return services;
            }
            catch (error) {
                return new DatabaseError("Failed to find services", error);
            }
        });
    }
    findAskedServicesinMapViewOfUser(swLat, swLng, neLat, neLng, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Parse coordinates to floats
                const swLat_p = parseFloat(swLat);
                const swLng_p = parseFloat(swLng);
                const neLat_p = parseFloat(neLat);
                const neLng_p = parseFloat(neLng);
                // Check if coordinates are valid
                if (!this.isValidCoordinate(swLat_p, swLng_p) ||
                    !this.isValidCoordinate(neLat_p, neLng_p)) {
                    throw new Error("Invalid coordinates");
                }
                // Validate and create ObjectId
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid ObjectId");
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
                                        [neLng_p, neLat_p],
                                    ],
                                },
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // Replace with your users collection name
                            localField: "partnerId",
                            foreignField: "_id",
                            as: "partnerDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "categories", // Replace with your categories collection name
                            localField: "categoryId",
                            foreignField: "_id",
                            as: "categoryDetails",
                        },
                    },
                ];
                // Execute the aggregation pipeline
                const askedServices = yield AskedService.aggregate(aggregationPipeline);
                return askedServices;
            }
            catch (error) {
                return new DatabaseError("Failed to find services", error);
            }
        });
    }
    findAllByPartnerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await AskedService.find({userId: id}).catch((error) => { return error; });
            try {
                const askedServices = yield AskedService.find({ userId: id });
                return askedServices;
            }
            catch (error) {
                return new DatabaseError("Failed to find services", error);
            }
        });
    }
    isValidCoordinate(lat, lng) {
        return (isFinite(lat) &&
            Math.abs(lat) <= 90 &&
            isFinite(lng) &&
            Math.abs(lng) <= 180);
    }
}
export default AskedServiceDAO;

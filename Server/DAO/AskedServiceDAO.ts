import AskedService, { AskedServiceInterface } from "../Models/AskedService.js";
import mongoose from "mongoose";
import DatabaseError from "./DataBaseError/DatabaseError.js";

interface AskedServiceDAOInterface {
    create(askedService: AskedServiceInterface): Promise<AskedServiceResult>;

    findById(id: string): Promise<AskedServiceResult>;

    findByPartnerId(id: string): Promise<AskedServiceArrayResult>;

    deleteById(id: string): Promise<AskedServiceResult>;

    updateById(
        id: string,
        askedService: AskedServiceInterface
    ): Promise<AskedServiceResult>;

    findAll(): Promise<AskedServiceArrayResult>;

    findAskedServicesinMapView(
        swLat: string,
        swLng: string,
        neLat: string,
        neLng: string,
        query: any
    ): Promise<AskedServiceArrayResult>;

    findAskedServicesinMapViewOfUser(
        swLat: string,
        swLng: string,
        neLat: string,
        neLng: string,
        id: string
    ): Promise<AskedServiceArrayResult>;

    findAllByPartnerId(id: string): Promise<AskedServiceArrayResult>;

    exists(id: string): Promise<boolean>;

    isValidCoordinate(lat: GLfloat, lng: GLfloat): boolean;
}

type AskedServiceResult = AskedServiceInterface | DatabaseError | null;

type AskedServiceArrayResult = AskedServiceInterface[] | DatabaseError | null;

class AskedServiceDAO implements AskedServiceDAOInterface {
    async create(
        askedService: AskedServiceInterface
    ): Promise<AskedServiceResult> {
        try {
            const newAskedService = new AskedService(askedService);
            const savedAskedService = await newAskedService.save();
            return savedAskedService;
        } catch (error) {
            return new DatabaseError("Failed to create service", error);
        }
    }

    async findById(id: string): Promise<AskedServiceResult> {
        try {
            const askedService = await AskedService.findById(id);
            return askedService;
        } catch (error) {
            return new DatabaseError("Failed to find service", error);
        }
    }

    async exists(id: string): Promise<boolean> {
        return (await AskedService.exists({ _id: id })) !== null;
    }

    async findByPartnerId(id: string): Promise<AskedServiceArrayResult> {
        try {
            const askedService = await AskedService.find({ partnerId: id });
            return askedService;
        } catch (error) {
            return new DatabaseError("Failed to find service", error);
        }
    }

    async deleteById(id: string): Promise<AskedServiceResult> {
        try {
            const askedService = await AskedService.findByIdAndDelete(id);
            return askedService;
        } catch (error) {
            return new DatabaseError("Failed to delete service", error);
        }
    }

    async updateById(
        id: string,
        askedService: AskedServiceInterface
    ): Promise<AskedServiceResult> {

        try {
            const updatedAskedService = await AskedService.findByIdAndUpdate(
                id,
                askedService
            );
            return updatedAskedService;
        } catch (error) {
            return new DatabaseError("Failed to update service", error);
        }
    }

    async findAll() {
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
            const askedServices = await AskedService.aggregate(aggregationPipeline);
            return askedServices;
        } catch (error) {
            return new DatabaseError("Failed to find services", error);
        }
    }

    async findAskedServicesinMapView(
        swLat: string,
        swLng: string,
        neLat: string,
        neLng: string,
        query: any
    ): Promise<AskedServiceArrayResult> {
        const swLat_p = parseFloat(swLat);
        const swLng_p = parseFloat(swLng);
        const neLat_p = parseFloat(neLat);
        const neLng_p = parseFloat(neLng);

        const {
            categoryId,
            priceRange,
            availability,
            minimumRating,
            serviceType,
            serviceStatus,
        } = query;

        console.log(
            parseFloat(priceRange.split(",")[0]),
            parseFloat(priceRange.split(",")[1])
        );

        try {
            const aggregationPipeline = [
                {
                    $match: {
                        position: {
                            $geoWithin: {
                                $box: [
                                    [swLng_p, swLat_p],
                                    [neLng_p, neLat_p],
                                ],
                            },
                        },

                        //Find by category
                        // @ts-expect-error TS(2552): Cannot find name 'ObjectId'. Did you mean 'Object'... Remove this comment to see the full error message
                        ...(categoryId != "" && { categoryId: new ObjectId(categoryId) }),
                        //Find by price range
                        ...(priceRange &&
                            priceRange.includes(",") && {
                            price: {
                                $gte: parseFloat(priceRange.split(",")[0]),
                                $lte: parseFloat(priceRange.split(",")[1]),
                            },
                        }),
                        //Find by availability
                        //...(availability != '' && { availability: availability === 'true' }),
                        //Find by status
                        ...(serviceStatus != "" && { status: serviceStatus }),
                        //Find by Service Type
                        ...(serviceType != "" && {
                            $or: [
                                { name: { $regex: serviceType, $options: "i" } },
                                { description: { $regex: serviceType, $options: "i" } },
                            ],
                        }),
                    },
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

            const services: any = await AskedService.aggregate(aggregationPipeline);
            console.log("ser", services.length);
            return services;
        } catch (error) {
            return new DatabaseError("Failed to find services", error);
        }
    }

    async findAskedServicesinMapViewOfUser(
        swLat: string,
        swLng: string,
        neLat: string,
        neLng: string,
        id: string): Promise<AskedServiceArrayResult> {
        try {
            // Parse coordinates to floats
            const swLat_p = parseFloat(swLat);
            const swLng_p = parseFloat(swLng);
            const neLat_p = parseFloat(neLat);
            const neLng_p = parseFloat(neLng);

            // Check if coordinates are valid
            if (
                !this.isValidCoordinate(swLat_p, swLng_p) ||
                !this.isValidCoordinate(neLat_p, neLng_p)
            ) {
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
            const askedServices: any = await AskedService.aggregate(
                aggregationPipeline
            );

            return askedServices;
        } catch (error) {
            return new DatabaseError("Failed to find services", error);
        }
    }

    async findAllByPartnerId(id: string): Promise<AskedServiceArrayResult> {
        // return await AskedService.find({userId: id}).catch((error) => { return error; });

        try {
            const askedServices = await AskedService.find({ userId: id });
            return askedServices;
        } catch (error) {
            return new DatabaseError("Failed to find services", error);
        }
    }
    isValidCoordinate(lat: GLfloat, lng: GLfloat): boolean {
        return (
            isFinite(lat) &&
            Math.abs(lat) <= 90 &&
            isFinite(lng) &&
            Math.abs(lng) <= 180
        );
    }
}

export default AskedServiceDAO;

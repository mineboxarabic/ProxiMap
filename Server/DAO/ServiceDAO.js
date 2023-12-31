import Service from "../Models/Service.js";

class ServiceDAO {
    async create(service) {
        const newService = new Service(service);
        return await newService.save().catch((error) => { return error; });
    }

    async findById(id) {
        return await Service.findById(id).catch((error) => { return error; });
    }

    async deleteById(id) {
        return await Service.findByIdAndDelete(id).catch((error) => { return error; });
    }

    async updateById(id, service) {
        return await Service.findByIdAndUpdate(id, service).catch((error) => { return error; });
    }

    async findAll() {
        return await Service.find().catch((error) => { return error; });
    }

} 

export default ServiceDAO;
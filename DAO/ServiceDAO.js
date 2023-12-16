import Service from "../Models/Service.js";

class ServiceDAO {
    async create(user) {
        const newUser = new Service(user);
        return await newUser.save();
    }

    async findById(id) {
        return await Service.findById(id);
    }

    async deleteById(id) {
        return await Service.findByIdAndDelete(id);
    }

    async updateById(id, user) {
        return await Service.findByIdAndUpdate(id, user);
    }

    async findAll() {
        return await Service.find();
    }

} 

export default ServiceDAO;
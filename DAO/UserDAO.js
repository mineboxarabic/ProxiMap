import User from "../Models/User.js";

class UserDAO {
    async create(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateById(id, user) {
        return await User.findByIdAndUpdate(id, user);
    }

    async findAll() {
        return await User.find();
    }

} 

export default UserDAO;
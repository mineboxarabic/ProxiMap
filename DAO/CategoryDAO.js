import Category from "../Models/Category.js";

class CategoryDAO {
    async create(user) {
        const newUser = new Category(user);
        return await newUser.save();
    }

    async findById(id) {
        return await Category.findById(id);
    }

    async deleteById(id) {
        return await Category.findByIdAndDelete(id);
    }

    async updateById(id, user) {
        return await Category.findByIdAndUpdate(id, user);
    }

    async findAll() {
        return await Category.find();
    }

} 

export default CategoryDAO;
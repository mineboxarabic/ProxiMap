import Category from "../Models/Category.js";

class CategoryDAO {
    async create(category) {
       console.log("category", category);
       const newCategory = new Category(category);
         const result = await newCategory.save().catch((err) => {
              return {error: err};
         });
        return result;
    }

    async findById(id) {
        return await Category.findById(id);
    }

    async deleteById(id) {
        return await Category.findByIdAndDelete(id);
    }

    async updateById(id, category) {
        return await Category.findByIdAndUpdate(id, category);
    }

    async findAll() {
        return await Category.find();
    }

} 

export default CategoryDAO;
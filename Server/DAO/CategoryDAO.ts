import Category from "../Models/Category.js";

class CategoryDAO {
    async create(category: any) {
       console.log("category", category);
       const newCategory = new Category(category);
         const result = await newCategory.save().catch((err) => {
              return {error: err};
         });
        return result;
    }

    async findById(id: any) {
        return await Category.findById(id);
    }

    async deleteById(id: any) {
        return await Category.findByIdAndDelete(id);
    }

    async updateById(id: any, category: any) {
        return await Category.findByIdAndUpdate(id, category);
    }

    async findAll() {
        return await Category.find();
    }

} 

export default CategoryDAO;
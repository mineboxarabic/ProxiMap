import Category, { CategoryInterface } from "../Models/Category.js";

interface CategoryDAOInterface {
    create(category: CategoryInterface): Promise<CategoryInterface | { error: Error }>;
    findById(id: string): Promise<CategoryInterface>;
    deleteById(id: string): Promise<CategoryInterface>;
    updateById(id: string, category: CategoryInterface): Promise<CategoryInterface>;
    findAll(): Promise<CategoryInterface[]>;
    exists(id: string): Promise<boolean>;
}


class CategoryDAO implements CategoryDAOInterface {
    async create(category: CategoryInterface): Promise<CategoryInterface | { error: Error }> {
        const newCategory = new Category(category);
        const result = await newCategory.save().catch((err) => {
            return { error: err };
        });
        return result;
    }

    async findById(id: string): Promise<CategoryInterface> {
        const category : any = await Category.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async deleteById(id: string): Promise<CategoryInterface> {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async updateById(id: string, category: CategoryInterface): Promise<CategoryInterface> {
        const updatedCategory = await Category.findByIdAndUpdate(id, category);
        if (!updatedCategory) {
            throw new Error('Category not found');
        }
        return updatedCategory;
    }

    async findAll(): Promise<CategoryInterface[]> {
        return await Category.find();
    }

    async exists(id: string): Promise<boolean> {
        const result = await Category.exists({ _id: id });
        return result !== null;
    }
}

export default CategoryDAO;

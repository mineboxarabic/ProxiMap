import mongoose, { Schema } from 'mongoose';


interface CategoryInterface {
    name: string;
    description: string;
}


const CategorySchema: Schema<CategoryInterface> = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: ""}
});

  
const Category = mongoose.model('Category', CategorySchema);

export default Category;
import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
    name: String,
    description: String
});

  
const Category = mongoose.model('Category', CategorySchema, { collection: 'categories'});

export default Category;
import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

  
const Category = mongoose.model('Category', CategorySchema, { collection: 'categories'});

export default Category;
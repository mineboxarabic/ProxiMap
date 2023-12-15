import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
    name: String,
    description: String,
    price: Number,
    availability: Boolean,
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }]
  });
  
const Service = mongoose.model('Service', serviceSchema);
export default Service;
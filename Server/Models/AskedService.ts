import mongoose from 'mongoose';
const AskedServiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    description: String,
    price: Number,
    position: {
      type: { type: String,
        enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0]}
     },
     date: {type: Date, default: Date.now},
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  }); 

const AskedService = mongoose.model('AskedService', AskedServiceSchema);
export default AskedService;
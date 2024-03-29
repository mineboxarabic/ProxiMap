import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    description: String,
    price: Number,
    position: {
        type: { type: String,
            enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    range: { type: Number, default: 0 },
    availability: Boolean,
    ratings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        }],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});
const Service = mongoose.model('Service', serviceSchema);
export default Service;

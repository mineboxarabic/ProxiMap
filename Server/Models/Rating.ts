import mongoose from 'mongoose';
const RatingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    rating: Number,
    date: { type: Date, default: Date.now }
});

  
const Rating = mongoose.model('Category', RatingSchema, { collection: 'ratings'});

export default Rating;
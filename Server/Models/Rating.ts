import mongoose, { Schema } from 'mongoose';

interface RatingInterface {
    userId: mongoose.Schema.Types.ObjectId;
    serviceId: mongoose.Schema.Types.ObjectId;
    rating: number;
    date: Date;

}

const RatingSchema : Schema<RatingInterface> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    rating: Number,
    date: { type: Date, default: Date.now }
});

  
// @ts-expect-error TS(2769): No overload matches this call.
const Rating = mongoose.model('Category', RatingSchema, { collection: 'ratings'});

export default Rating;
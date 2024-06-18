import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
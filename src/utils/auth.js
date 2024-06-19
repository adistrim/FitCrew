import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from './dbConnect';

export const registerUser = async (userData) => {
    await dbConnect();

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();

    return user;
};

export const loginUser = async (email, password) => {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return { user, token };
};

export const verifyToken = async (token) => {
    await dbConnect();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

import mongoose from 'mongoose';


interface connectType{
    isConnected?: number;
}


const connections:connectType={}

const connectDB= async () => { 
    if (connections.isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        connections.isConnected = db.connections[0].readyState ;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connectDB;
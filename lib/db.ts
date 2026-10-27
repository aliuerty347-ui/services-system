import mongoose from 'mongoose';
import { Boldonse } from 'next/font/google';
import { buffer } from 'stream/consumers';
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('خطا في اتصال مع قاعدةالبيانات')
}
let cached = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
        }
        cached.promise =await mongoose.connect(MONGODB_URI!, opts)
        try {
            cached.conn = await cached.promise
        } catch (e) {
            console.log(e)
        }
    }
    return cached.conn
}
export default connectDB;
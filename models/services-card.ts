import mongoose from "mongoose";

interface ServicesCard {
    userId:string,
    userName:string,
    title: string,
    provider: string,
    category: string,
    price: number,
    duration: string,
    rating: number,
    image: string,
    inforser:[],
    book: [],
    comments:[];
    userWhatsapp:string

}
const newServicesCard = new mongoose.Schema<ServicesCard>({
    userWhatsapp:{
        type: String,
         required: true
    },
    userId:{
        type: String,
         required: true
    },
    userName:{
         type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {type: String,required: true},
    rating: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    book: [
        {
      book1: { type: String },
       createdAt: { type: Date, default: Date.now } // اختياري: لحفظ وقت التعليق
        }
    ],
    comments: [
    { 
        ratingUser: { type: Number, required: true ,max:5},
      commentText: { type: String, required: true },
      userSub: { type: String, required: true },
      createdAt: { type: Date, default: Date.now } // اختياري: لحفظ وقت التعليق
    }
  ],
    


})
const ServicesCard = mongoose.models.ServicesCard || mongoose.model('ServicesCard', newServicesCard);
export default ServicesCard;
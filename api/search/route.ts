import connectDB from "@/lib/db"
import ServicesCard from "@/models/services-card";
import { error } from "console";
import { NextResponse } from "next/server";


export  async function GET(req:Request){
    try{
        await connectDB()
         const { searchParams } =new URL(req.url);
        const qu = searchParams.get('srr')
    
    const filter = qu ?
            { title: { $regex: qu, $options: 'i' } }
            : {};
           const u = await ServicesCard.find(filter)
           return NextResponse.json({seccess:true,data:u},{status:200})
}catch(e:any){
           return NextResponse.json({seccess:false,error:e.message},{status:500})

}


}
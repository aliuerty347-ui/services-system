import connectDB from "@/lib/db"
import ServicesCard from "@/models/services-card";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try{
      const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        console.log(id)
        await connectDB();
        const data=await ServicesCard.find({
            userId:id
        })
        return NextResponse.json({seccess:true,data:data})
}
catch(e:any){
        return NextResponse.json({seccess:false,error:e.message})

}
}

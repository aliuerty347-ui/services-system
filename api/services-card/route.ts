import connectDB from "@/lib/db";
import servicesCard from "@/models/services-card";
import { Chathura } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectDB();
 

        const data = await servicesCard.find()
        return NextResponse.json({ success: true, data: data }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
}
export async function POST(request:any) {
  try {
        await connectDB();
        const body= await request.json()
        const data=await servicesCard.create(body)
        return NextResponse.json({ success: true, data: data })
  }catch (e: any) {
        return NextResponse.json({ success: false, error: e.message })
    }
}
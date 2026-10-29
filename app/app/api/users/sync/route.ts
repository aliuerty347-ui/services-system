import connectDB from "@/lib/db";
import Users from "@/models/users";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("Received body:", body); // اطبع البيانات لمعرفة ما يتم إرساله

    const { clerkId, email, role,userName } = body;
    
 
    // 2. تحديث أو حفظ المستخدم في قاعدة بيانات MongoDB
    const data = await Users.findOneAndUpdate(
      { clerkId },
      { email, role: role || 'user',userName },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, user: data });
  } catch (e: any) {
    console.error("Error in sync route:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
export async function GET(req: Request) {
        try {
        await connectDB();
 

        const data = await Users.find()
        return NextResponse.json({ success: true, data: data }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
}

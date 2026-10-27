import connectDB from '@/lib/db';
import Users from '@/models/users';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { role } = await req.json();

    // تحديث البيانات على السيرفر بآمان
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في السيرفر' }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    await connectDB()
    const data=await Users.find({})
    return NextResponse.json({seccess:true,data:data})
  }catch(e:any){
    return NextResponse.json({seccess:false,error:e.message})

  }
}

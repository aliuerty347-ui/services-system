import connectDB from "@/lib/db";
import ServicesCard from "@/models/services-card";
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const data = await ServicesCard.find({ _id: id })
        return NextResponse.json({ success: true, data: data, idd: id }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
}











export async function POST(req: NextResponse) {
try{
    
        const body= await req.json()
        await connectDB();
            const data1 = await ServicesCard.findOne({
            _id: body.id,
            "book.book1":body.datee})
        if(data1){
        return NextResponse.json({seccess:false,mes:"محجوز"})

        }
           
       
        const data = await ServicesCard.findOneAndUpdate(
            {_id: body.id},
        {
        $push:{
            
            book:{
                $each:[
{                book1:body.datee,
                createdAt:new Date()}
                ],
                $position:0
            }
        }
    } ,
    { returnDocument: 'after' }
        )
        return NextResponse.json({seccess:true,data:data})
  


}
catch(e:any){
return NextResponse.json({seccess:false,error:e.message})

}

}












// export async function POST(req: NextResponse) {
// try{
    
//         const body= await req.json()
//         await connectDB();
       
     
            
      
           
       

//         const data1 = await ServicesCard.findOne({
//             _id: body.id,
//             "book.book1":body.datee})
//         if(data1){
//         return NextResponse.json({seccess:false,mes:"محجوز"})

//         }
           
       
//         const data = await ServicesCard.findOneAndUpdate(
//             {_id: body.id},
//         {
//         $push:{
//             book:{
//                 book1:body.datee,
//                 createdAt:new Date()
//             }
//         }
//     } ,
//     { returnDocument: 'after' }
//         )
//         return NextResponse.json({seccess:true,data:data})
  


// }
// catch(e:any){
// return NextResponse.json({seccess:false,error:e.message})

// }

// }
import connectDB from "@/lib/db";
import ServicesCard from "@/models/services-card";
import { error } from "console";
import { NextResponse } from "next/server";

export  async function POST(req:Request) {
        
   
    
try{    
    await connectDB()
    const body=await req.json();
    const data=await ServicesCard.findOneAndUpdate(
        {_id:body.id},
        {$push:{
            comments:{
                $each:[
               { commentText: body.commentText,
                userSub: body.userSub,
                ratingUser:body.rate,
            }
                ],
            
            $position:0
            },
        },
    }, 
    
    // {$set:{rating:body.ratingUser}}
    
    {new:true},

    )
    if(!data){return NextResponse.json({seccess:false,error:"Service not found"})}
    const comment=await data.comments;
    let totalRate:any=0;
        for(let i=0;i<comment.length;i++){
           totalRate +=comment[i].ratingUser
        }
        const avg=comment.length>0?Number(totalRate/ comment.length).toFixed(1):0;
        data.rating= avg;
        await data.save();
    return NextResponse.json(
        {
            seccess:true,
        data:data.comments,
        dataRate:data.rating,
        ii:"ppp"
    })}
    catch(e:any){
    return NextResponse.json({seccess:false,error:e.message,yy:"fff"})
        
    }
    
}
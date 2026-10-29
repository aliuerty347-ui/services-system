// "use client"

// import { useState } from "react"
// import './dashs.css'
// export default async function DashSe(){
//     const [t,setT]=useState("")
//     const [pro,setPro]=useState("")
//     const [c,setC]=useState("")
//     const [pri,setPri]=useState("")
//     const [d,setD]=useState("")
//     const [dd,setDd]=useState("")
//     const [r,setR]=useState("")
//     const [i,setI]=useState("")
  
  
//     async function o(e:any) {
//         e.preventDefault()
// try{
//         const res=await fetch('/api/services-card',{
//             method:'POST',
//              headers:{'Content-type':'application/json'},
//             body:JSON.stringify({
//                 title:t,
//                 provider:pro,
//                 category:c,
//                 price:pri,
//                 duration:d,
//                 rating:r,
//                 image:i,
//                 book:dd
//             })

//         })
//         const data=await res.json();
//         console.log(data)
//     }
//         catch(e){
//             console.log(e)
//         }
//     }
// return (
//     <div className="dash-container">
//       <h1>هل تريد ان تحول حسابك تجاري</h1>
      
//       <form onSubmit={o} className="dash-form">
//         <input type="text" placeholder="العنوان (Title)" onChange={(e)=>setT(e.target.value)}/>
//         <input type="text" placeholder="المزود (Provider)" onChange={(e)=>setPro(e.target.value)}/>
//         <input type="text" placeholder="الفئة (Category)" onChange={(e)=>setC(e.target.value)}/>
//         <input type="number" placeholder="السعر (Price)" onChange={(e)=>setPri(e.target.value)}/>
//         <input type="number" placeholder="المدة (Duration)" onChange={(e)=>setD(e.target.value)}/>
//         <input type="number" placeholder="التقييم (Rating)" onChange={(e)=>setR(e.target.value)}/>
//         <input type="text" placeholder="رابط الصورة (Image)" onChange={(e)=>setI(e.target.value)}/>
//         <input type="date" placeholder="تاريخ الحجز (Book)" onChange={(e)=>setDd(e.target.value)}/>
        
//         <button type="submit">إرسال البيانات</button>
//       </form>
//     </div>
//   )
// }
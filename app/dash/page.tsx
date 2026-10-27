"use client"

import { useEffect, useState } from "react"
import { useUser } from '@clerk/nextjs'
import './d.css'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { url } from "inspector"
export default function DashSe() {
    const router = useRouter()
    const { user } = useUser() // 2. جلب بيانات المستخدم
    const [t, setT] = useState("")
    const [pro, setPro] = useState("")
    const [c, setC] = useState("")
    const [pri, setPri] = useState("")
    const [d, setD] = useState("")
    const [dd, setDd] = useState("")
    const [r, setR] = useState("")
    const [i, setI] = useState("")
    const [ww, setWw] = useState("")
    const [fa, setFa] = useState(false)
    const [sp, setSp] = useState([])
    useEffect(() => {
        // تأكد أولاً أن بيانات المستخدم تم جلبها
        if (user) {
            const userRole = user?.publicMetadata?.role; // أو حسب كيف تخزن الـ role لديك

            if (userRole !== 'business') {
                // يمكنك توجيهه لصفحة أخرى، أو عرض رسالة
                alert("غير مصرح لك بالدخول، هذه الصفحة خاصة بحسابات الأعمال (Business)");
                router.back(); // توجيه لصفحة البداية أو صفحة unauthorised
            }
        }
    }, [user, router]);
    useEffect(() => {
        console.log("قيمة sp الجديدة هي:", sp);
    }, [sp]);
    useEffect(() => {


        async function fetchData() {
            try {

                if (user?.id) {
                    console.log(user?.id)
                    const res = await fetch(`/api/serPro?id=${user?.id}`);
                    const data = await res.json();
                    // نضع البيانات داخل مصفوفة لضمان عمل الـ map لاحقاً، أو نتحقق إن كانت مصفوفة أصلاً
                    const ru = await data.data
                    setSp(ru);

                    console.log(data.data)
                    console.log(ru)

                }
            } catch (error) {
                console.log("Error fetching services:", error);
            }
        }
        fetchData();
    }, [user?.id]);

    async function o(e: any) {
        e.preventDefault()
        try {

            console.log(user?.fullName || user?.username || "Anonymous")
            const res = await fetch('/api/services-card', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    userName: user?.fullName || user?.username || "Anonymous",
                    title: t,
                    provider: pro,
                    category: c,
                    price: Number(pri), // تأكد أن الأرقام تحول لـ Number إذا كانت مطلوبة كأرقام
                    duration: d,
                    rating: Number(r),
                    image: i,
                    book: [{ book1: dd }],
                    userWhatsapp:ww,
                })// 👈 تعديل هنا ليتوافق مع المصفوفة والكائن في الـ Schema

            })


            const data = await res.json();
            console.log(data)
            console.log(data.data)
            const tq = await data.data
            // setSp(tq)
        }
        catch (e) {
            console.log(e)
        }
    }


    return (<>
        <div className="dash-container">
           

            <form onSubmit={o} className="dash-form">
                <input type="text"  placeholder="العنوان (Title)" onChange={(e) => setT(e.target.value)}  required/>
                <input type="text" placeholder="المزود (Provider)" onChange={(e) => setPro(e.target.value)}required />
                <input type="text" placeholder="الفئة (Category)" onChange={(e) => setC(e.target.value)} required/>
                <input type="number" placeholder="السعر (Price)" onChange={(e) => setPri(e.target.value)}required />
                <input type="text" placeholder="المدة (Duration)" onChange={(e) => setD(e.target.value)}required />
                <input type="number" placeholder="التقييم (Rating)" onChange={(e) => setR(e.target.value)} required/>
                <input type="text" placeholder="رابط الصورة (Image)" onChange={(e) => setI(e.target.value)} required/>
                <input type="date" placeholder="تاريخ الحجز (Book)" onChange={(e) => setDd(e.target.value)} />
                <input type="text" placeholder="user wats app" onChange={(e) => setWw(e.target.value)}required />
                <button type="submit">إرسال البيانات</button>
            </form>
        </div>
        <div className="services-container" dir="rtl">
            <div className="services-header">
               <h2>your services</h2>
            </div>

            <div className="cards-grid">
                {sp.map((it: any) => (
                    <div key={it._id} className="service-card">
                        <div className="card-image-wrapper">
                            <img
                                src={it.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"}
                                alt={it.title}
                            />
                            <span className="card-category">{it.category}</span>
                        </div>

                        <div className="card-content">
                            <div className="card-info-top">
                                <span className="provider-name">المزود: {it.provider}</span>
                                <span className="card-rating">⭐ {it.rating}</span>
                            </div>

                            <h3 className="card-title">{it.title}</h3>

                            <div className="card-footer">
                                <div className="card-meta">
                                    <span>⏱️ {it.duration}</span>
                                    <span className="card-price">${it.price}</span>
                                </div>

                                <Link href={`/services/${it._id}`} className="book-btn">
                                    معلومات اكثر
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </>
    )
}

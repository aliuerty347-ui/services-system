"use client"
import Link from 'next/link';
import './home.css'; // استدعاء ملف الـ CSS المنفصل
import { useState } from 'react';
import '../../app/services/services.css'

export default function HomePage() {
  const[s,setS]=useState("")
  const[sr,setSr]=useState([])
  async function o(e:any) {
    e.preventDefault()
    try{
    const res=await fetch(`/api/search?srr=${s}`);
    const data=await res.json()
    setSr(data.data)
    console.log(data)}
    catch(e:any){
      console.log(e.message)
    }
  }
  return (
    <div className="home-container" dir="rtl">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="hero-section">
        <span className="badge">منصتك الأولى لحجز الاستشارات والخدمات</span>
        <h1>احجز موعدك مع أفضل الخبراء <span>بكل سهولة وسرعة</span></h1>
        <p>تصفح مئات الخدمات الاحترافية، اختر الوقت المناسب لك من التقويم، وأكد حجزك فوراً.</p>
        <form onSubmit={o}>
        <div className="search-box">
          <input type="text" placeholder="ابحث عن خدمة، مبرمج، أو مدرب..." onChange={(e)=>{setS(e.target.value)}}/>
          <button>بحث</button>
        

        </div>
        </form>
      </section>
      
      <div className="cards-grid">
        {sr.map((it: any) => (
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
                  احجز الآن
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
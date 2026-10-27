"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./services.css";
export default function Services() {
  const [sp, setSp] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/services-card');
        const data = await res.json();
        if (data.success) {
          setSp(data.data);
          console.log(data.data)
        }
      } catch (error) {
        console.log("Error fetching services:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="services-container" dir="rtl">
      <div className="services-header">
        <h1>نظام الخدمات المتاحة</h1>
        <p>تصفح أحدث الخدمات واستشر الخبراء واحجز موعدك الآن</p>
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
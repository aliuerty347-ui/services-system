"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./services.css";
export default function Services() {
  const [sp, setSp] = useState<any[]>([]);
  const [lod, setLod] = useState<any>(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLod(false)
        const res = await fetch('/api/services-card');
        const data = await res.json();
        if (data.success) {
          setSp(data.data);
          console.log(data.data)
        }
      } catch (error) {
        console.log("Error fetching services:", error);
      }finally{
        setLod(true)
      }
    }
    fetchData();
  }, []);

  return (
    <div className="services-container" dir="rtl">
      <div className="services-header">
        <h1>Available Services</h1>
        <p>Explore the latest services, consult experts, and book your appointment now</p>
      </div>
      {lod ?
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
                  <span className="provider-name">Provider: {it.provider}</span>
                  <span className="card-rating">⭐ {it.rating}</span>
                </div>

                <h3 className="card-title">{it.title}</h3>

                <div className="card-footer">
                  <div className="card-meta">
                    <span>⏱️ {it.duration}</span>
                    <span className="card-price">${it.price}</span>
                  </div>

                  <Link href={`/services/${it._id}`} className="book-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        : <> <><div className="l">
          <div className="spinner"></div>
        </div>
        </></>}   </div>
  );
}
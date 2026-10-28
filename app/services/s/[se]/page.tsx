  "use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import "./ser.css"
  export default  function uu({ params }: { params: Promise<{ se: string }> }) {
      const [sr, setSr] = useState([]);
     const [lo,setLo]=useState(false)
    
  useEffect(()=>{
    async function fd(){
          try {
             const resolvedParams = await params;
        const servicese= resolvedParams.se;
        console.log(servicese)
      setLo(true)
      const res = await fetch(`/api/search?srr=${servicese}`);
      const data = await res.json();
      setSr(data.data);
      console.log(data);
    } catch (e: any) {
        console.log(e.message);
    }
    finally{
        setLo(false)
    }}
    fd()
},[])
return(<>{ !lo?<div className="cards-grid">
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
                <span className="provider-name">provider: {it.provider}</span>
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
      </div>:<>
        <><div className="l">
              <div className="spinner"></div>
              <div>Searching...</div>
              </div>
            </>
        </>}</>)
}
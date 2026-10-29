"use client"

import { useEffect, useState, useRef } from "react";
import "./oo.css"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { BookBookmark } from "lucide-react";
export const dyamic = 'force-dynamic'
export default function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useUser() // 2. جلب بيانات المستخدم
  const refresh = useRouter();
  const [c, setC] = useState([]);
  const [c1, setC1] = useState([]);
  const [d, setD]: any = useState();
  const [d1, setD1] = useState();
  const [num, setNum] = useState();
  const [tc, setTc] = useState("");
  const [mes, setMes] = useState("");
  const [tc1, setTc1] = useState([]);
  const [avg1, setAvg1] = useState();
  const is = useRef(true)

  useEffect(() => {
    const po = async () => {
      try {
        const resolvedParams = await params;
        const serviceId = resolvedParams.id;
        const res = await fetch(`/api/services-card/w/?id=${serviceId}`)
        const data = await res.json();
        console.log(data.data)
        setC(data.data)
        setTc1(data.data[0].comments)
        setC1(data.data[0].book)

      }
      catch (e) {
        console.log(e)
      }
    }
    po()
  }, [])
  async function i(e: any) {

    e.preventDefault()
    setD1(d)
    try {
      const resolvedParams = await params;
      const serviceId = resolvedParams.id;
      const res = await fetch('/api/services-card/w', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          id: serviceId,
          datee: d,


        })
      })
      const data = await res.json()

      if (data.mes) {
        console.log(data.mes)
        return setMes(data.mes)
      }
      setC1(data.data.book)
      setMes("")
      console.log(data.data.book)
    } catch (e: any) {
      console.log(e)
    }

  }
  async function comm(e: any) {
    e.preventDefault()

    try {
      const resolvedParams = await params;
      const serviceId = resolvedParams.id;
      const res = await fetch('/api/services-card/w/addComment', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          commentText: tc,
          id: serviceId,
          rate: num||1,
          userSub: user?.fullName || user?.username || "Anonymous",

        })

      })
      const data = await res.json()
      console.log(data.data)
      setTc1(data.data)
      refresh.refresh()


      console.log(data)

    } catch (e: any) {
      console.log(e)
    }

  }

  return (
    <div className="service-details-container">
      {c.map((it: any) => (
        <div key={it._id} className="service-card">

          {/* Service Header */}
          <div className="service-header">
            <div className="service-info">
              <h1 className="service-title">{it.title}</h1>
              <p className="service-provider">
                Provided by: <span>{it.provider}</span>
              </p>
              <div className="service-meta">
                <span className="badge-category">{it.category}</span>
                <span className="meta-item">⏱️ Duration: {it.duration}</span>
                <span className="meta-rating">⭐ {it.rating} / 5</span>
              </div>
            </div>
            <div className="service-price-box">
              <span className="price-amount">${it.price}</span>
            </div>
          
          </div>
{it?.userWhatsapp && (
  <a
    href={`https://t.me/${String(it.userWhatsapp).replace(/^@/, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-btn"
  >
    💬 تواصل عبر التليجرام
  </a>
)}

          {/* Booking Section */}
          <div className="booking-section">
            <h2 className="section-title">📅 Book a New Appointment</h2>
            <form
              onSubmit={i}
              className="booking-form"
            >
              <input
                type="datetime-local"
                onChange={(e: any) => setD(e.target.value)}
                className="date-input"
                required
              />
              <button type="submit" className="btn-book">
                Book Now
              </button>
            </form>
            {mes ? <><h5 className="booked">This data is unavailable</h5></> : <></>}
          </div>


          {/* Booked Dates */}
          <div className="booked-dates-section">
            <h3 className="sub-title">📋 Reserved Time Slots:</h3>
            {it.book && it.book.length > 0 ? (
              <div className="booked-list">
                {c1.map((u: any, index: number) => (
                  <div key={index} className="booked-item">
                    🔒 Reserved: {u.book1}
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No booked slots yet. Feel free to choose any time!</p>
            )}
          </div>

          {/* Add Review/Comment */}
          <div className="add-comment-section">
            <h3 className="sub-title">💬 Leave a Review</h3>
            <form
              onSubmit={comm}
              className="comment-form"
            >
              <input
                type="text"
                placeholder="Write your review here..."
                onChange={(e: any) => setTc(e.target.value)}
                className="comment-input"
                required
              />
              
               <div className="rating-group"> 
                How many start ?
  <label><input type="radio" name="rating" value="1" onChange={(e: any) => { setNum(e.target.value) }}/><span>1</span></label>
  <label><input type="radio" name="rating" value="2" onChange={(e: any) => { setNum(e.target.value) }}/><span>2</span></label>
  <label><input type="radio" name="rating" value="3" onChange={(e: any) => { setNum(e.target.value) }}/><span>3</span></label>
  <label><input type="radio" name="rating" value="4" onChange={(e: any) => { setNum(e.target.value) }}/><span>4</span></label>
  <label><input type="radio" name="rating" value="5" onChange={(e: any) => { setNum(e.target.value) }}/><span>5</span></label>
</div>
              <button type="submit" className="btn-comment">
                Submit
              </button>
            </form>
          </div>

          {/* Customer Reviews List */}
          <div className="reviews-section">
            <h3 className="sub-title">Customer Reviews & Ratings:</h3>
            {it.comments && it.comments.length > 0 ? (
              <div className="comments-list">
                {tc1.map((u: any, index: number) => (
                  <div key={index} className="comment-card">
                    <p className="comment-author">{u.userSub || 'User'}</p>
                    <p className="comment-text">{u.commentText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No reviews yet.</p>
            )}
          </div>

        </div>
      ))}
    </div>
  )
}
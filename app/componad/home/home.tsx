"use client"
import Link from 'next/link';
import './home.css';
import { useState } from 'react';
import '../../app/services/services.css';

export default function HomePage() {
  const [s, setS] = useState("");
 



  return (
    <div className="home-container" dir="ltr">
      {/* Hero Section with Rich Background & Elements */}
      <section className="hero-section">
        <div className="hero-backdrop"></div>
        <div className="hero-content">
          <span className="badge">
            <span className="badge-dot"></span> #1 Platform for Expert Consultations
          </span>
          <h1>Find & Book Top Professionals <span className="highlight">Instantly</span></h1>
          <p>Connect with verified developers, mentors, and consultants. Schedule meetings, pick convenient time slots, and grow your projects seamlessly.</p>
          
          <form>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search for web development, UI/UX, database design..." 
                onChange={(e) => setS(e.target.value)}
              />
             <Link href={`/services/s/${s}`}> <button type="submit">Explore Now</button></Link>
            </div>
          </form>

          {/* Quick Categories Tags to fill space and add life */}
          <div className="quick-tags">
            <span>our servrices:</span>
            <button >Development</button>
            <button >UI/UX Design</button>
            <button >Marketing</button>
            <button >Consulting</button>
          </div>

          {/* Trust Stats Bar */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Verified Experts</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Sessions Booked</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <div className="cards-grid-section">
        <div className="section-header">
          <h2>Featured Services</h2>
          <p>Hand-picked professional services ready for immediate booking</p>
        </div>

       
      </div>
    </div>
  );
}
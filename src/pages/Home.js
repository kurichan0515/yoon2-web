import React from 'react';
import SocialFeed from '../components/SocialFeed';
import appConfig from '../config/appConfig';
import './Home.css';

const Home = ({ onNavigateToBooking }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>プロの技術で快適な耳かきを</h1>
          <p>経験豊富なスタッフが、丁寧で安全な耳かきサービスを提供いたします</p>
          <button onClick={() => onNavigateToBooking('booking')} className="cta-button">
            今すぐ予約する
          </button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>サービスの特徴</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>プロの技術</h3>
              <p>経験豊富なスタッフが丁寧に耳かきを行います</p>
            </div>
            <div className="feature-card">
              <h3>安全第一</h3>
              <p>衛生管理を徹底し、安全な環境でサービスを提供</p>
            </div>
            <div className="feature-card">
              <h3>リラックス</h3>
              <p>快適な空間でリラックスしてお過ごしいただけます</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>サービスメニュー</h2>
          <div className="services-grid">
            {appConfig.shop.services.map(service => (
              <div key={service.id} className="service-card">
                <h3>{service.name}</h3>
                <p className="duration">{service.duration}</p>
                <p className="price">¥{service.price.toLocaleString()}</p>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="social-section">
        <div className="container">
          <SocialFeed />
        </div>
      </section>
    </div>
  );
};

export default Home;

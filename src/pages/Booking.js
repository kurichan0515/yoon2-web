import React from 'react';
import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
  return (
    <div className="booking-page">
      <div className="container">
        <h1>予約フォーム</h1>
        <p className="booking-description">
          ご希望の日時とサービスをお選びください。<br />
          確認のため、後日ご連絡いたします。
        </p>
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;

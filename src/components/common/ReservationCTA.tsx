'use client';

import appConfig from '../../config/appConfig';
import { trackLineClick } from '../../services/analyticsService';
import './ReservationCTA.css';

interface Props {
  heading?: string;
  description?: string;
  sourceLabel: string;
}

function ReservationCTA({ heading = 'ご予約はLINEから', description, sourceLabel }: Props) {
  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;

  return (
    <section className="reservation-cta section-sm">
      <div className="container">
        <div className="reservation-cta-box">
          <h2 className="reservation-cta-heading">{heading}</h2>
          {description && <p className="reservation-cta-desc">{description}</p>}
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary reservation-cta-btn"
            onClick={() => trackLineClick(sourceLabel)}
          >
            LINEで予約・相談する
            <span className="visually-hidden">（{sourceLabel}、新しいウィンドウで開きます）</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ReservationCTA;

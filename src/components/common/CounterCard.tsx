import React from 'react';
import './CounterCard.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  count: number;
  todayCount?: number;
  description?: string;
  onClick?: () => void;
}

const CounterCard = ({
  name,
  count,
  todayCount,
  description,
  onClick,
  className = '',
  ...props
}: Props) => {
  const fmt = (v: number) => v.toLocaleString('ja-JP');

  return (
    <div
      className={`counter-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      } : undefined}
      {...props}
    >
      <div className="counter-card-header">
        <h3 className="counter-card-name" title={name}>{name}</h3>
        {todayCount != null && (
          <span className="counter-card-today-badge">今日: +{fmt(todayCount)}</span>
        )}
      </div>
      <div className="counter-card-value">{fmt(count)}</div>
      {description && (
        <p className="counter-card-description" title={description}>{description}</p>
      )}
    </div>
  );
};

export default CounterCard;

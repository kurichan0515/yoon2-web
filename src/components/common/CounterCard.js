import React from 'react';
import PropTypes from 'prop-types';
import './CounterCard.css';

/**
 * CounterCardコンポーネント
 * カウント値を表示するカード形式のコンポーネント
 * 
 * @example
 * <CounterCard 
 *   name="予約数" 
 *   count={150}
 *   todayCount={5}
 *   description="今月の予約総数"
 *   onClick={handleClick}
 * />
 */
const CounterCard = ({ 
  name, 
  count, 
  todayCount, 
  description, 
  onClick,
  className = '',
  ...props 
}) => {
  const formatCount = (value) => {
    // 数値を3桁区切りでフォーマット
    return value.toLocaleString('ja-JP');
  };

  return (
    <div 
      className={`counter-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    >
      <div className="counter-card-header">
        <h3 className="counter-card-name" title={name}>
          {name}
        </h3>
        {todayCount !== undefined && todayCount !== null && (
          <span className="counter-card-today-badge">
            今日: +{formatCount(todayCount)}
          </span>
        )}
      </div>
      
      <div className="counter-card-value">
        {formatCount(count)}
      </div>
      
      {description && (
        <p className="counter-card-description" title={description}>
          {description}
        </p>
      )}
    </div>
  );
};

CounterCard.propTypes = {
  /** カードの名前/タイトル */
  name: PropTypes.string.isRequired,
  /** 表示するカウント値 */
  count: PropTypes.number.isRequired,
  /** 今日の増加数（オプション） */
  todayCount: PropTypes.number,
  /** 説明文（オプション） */
  description: PropTypes.string,
  /** クリック時のハンドラ関数（オプション） */
  onClick: PropTypes.func,
  /** 追加のCSSクラス */
  className: PropTypes.string,
};

export default CounterCard;

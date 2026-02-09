import React, { useState, useEffect } from 'react';
import CounterCard from '../components/common/CounterCard';
import Button from '../components/common/Button';
import AdSense from '../components/common/AdSense';
import './MainScreen.css';

// ダミーデータ
const MOCK_COUNTERS = [
  { id: '1', name: 'コーヒー', count: 120, today: 3, desc: 'カフェイン摂取量' },
  { id: '2', name: '腕立て伏せ', count: 50, today: 0, desc: '毎日の日課' },
];

/**
 * MainScreenコンポーネント
 * カウンター一覧を表示するメイン画面
 */
const MainScreen = () => {
  const [counters, setCounters] = useState(MOCK_COUNTERS);
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const handleCounterClick = (counterId) => {
    console.log('詳細へ', counterId);
    // 詳細ページへのナビゲーションなど
  };

  const handleCreateCounter = () => {
    console.log('カウンター作成');
    // カウンター作成モーダルを開くなど
  };

  const handleAddRecord = () => {
    console.log('記録を追加');
    // 記録追加モーダルを開くなど
  };

  return (
    <div className="main-screen">
      {/* 1. ヘッダー */}
      <header className="main-screen-header">
        <h1 className="main-screen-title">なんでもカウンター</h1>
        <p className="main-screen-date">{today}</p>
      </header>

      {/* 2. コンテンツエリア */}
      <main className="main-screen-content">
        <div className="main-screen-scroll">
          {counters.length > 0 ? (
            <div className="counter-cards-container">
              {counters.map((counter) => (
                <CounterCard
                  key={counter.id}
                  name={counter.name}
                  count={counter.count}
                  todayCount={counter.today}
                  description={counter.desc}
                  onClick={() => handleCounterClick(counter.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-text">カウンターがありません</p>
              <p className="empty-sub-text">新しいカウンターを作成してください</p>
            </div>
          )}
          
          {/* 3. 広告エリア（プレースホルダー） */}
          <div className="ad-banner">
            <AdSense />
          </div>
        </div>
      </main>

      {/* 4. フッター（アクションボタンエリア） */}
      <footer className="main-screen-footer">
        <div className="button-row">
          <div className="button-col">
            <Button 
              title="カウンター作成" 
              onClick={handleCreateCounter}
              variant="primary"
              fullWidth={true}
            />
          </div>
          <div className="button-col">
            <Button 
              title="記録を追加" 
              onClick={handleAddRecord}
              variant="primary"
              fullWidth={true}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainScreen;

import React, { useState } from 'react';
import CounterCard from '../components/common/CounterCard';
import Button from '../components/common/Button';
import AdSense from '../components/common/AdSense';
import './MainScreen.css';

interface Counter {
  id: string;
  name: string;
  count: number;
  today: number;
  desc: string;
}

const MOCK_COUNTERS: Counter[] = [
  { id: '1', name: 'コーヒー', count: 120, today: 3, desc: 'カフェイン摂取量' },
  { id: '2', name: '腕立て伏せ', count: 50, today: 0, desc: '毎日の日課' },
];

const MainScreen = () => {
  const [counters] = useState<Counter[]>(MOCK_COUNTERS);
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  return (
    <div className="main-screen">
      <header className="main-screen-header">
        <h1 className="main-screen-title">なんでもカウンター</h1>
        <p className="main-screen-date">{today}</p>
      </header>
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
                  onClick={() => console.log('詳細へ', counter.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-text">カウンターがありません</p>
              <p className="empty-sub-text">新しいカウンターを作成してください</p>
            </div>
          )}
          <div className="ad-banner"><AdSense /></div>
        </div>
      </main>
      <footer className="main-screen-footer">
        <div className="button-row">
          <div className="button-col">
            <Button title="カウンター作成" onClick={() => {}} variant="primary" fullWidth />
          </div>
          <div className="button-col">
            <Button title="記録を追加" onClick={() => {}} variant="primary" fullWidth />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainScreen;

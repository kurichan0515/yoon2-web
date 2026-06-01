'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { getPageViewStats, getDailyPageViewStats, getRealTimeStats } from '../services/analyticsService';
import './AnalyticsDashboard.css';

interface PageStat {
  pageName: string;
  totalViews: number;
  uniqueViews: number;
  lastViewed: Date | null;
}

interface RealTimeStat {
  totalViewsLastHour: number;
  activePages: number;
  topPages: PageStat[];
}

const AnalyticsDashboard = () => {
  const [pageStats, setPageStats] = useState<PageStat[]>([]);
  const [dailyStats, setDailyStats] = useState<Record<string, Record<string, number>>>({});
  const [realTimeStats, setRealTimeStats] = useState<Partial<RealTimeStat>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const fetchPageStats = async () => {
    try {
      setIsLoading(true);
      setPageStats(await getPageViewStats() as PageStat[]);
    } catch (e) { console.error('ページ統計取得エラー:', e); }
    finally { setIsLoading(false); }
  };

  const fetchDailyStats = async (days: number) => {
    try { setDailyStats(await getDailyPageViewStats(days) as Record<string, Record<string, number>>); }
    catch (e) { console.error('日別統計取得エラー:', e); }
  };

  const fetchRealTimeStats = async () => {
    try { setRealTimeStats(await getRealTimeStats() as Partial<RealTimeStat>); }
    catch (e) { console.error('リアルタイム統計取得エラー:', e); }
  };

  useEffect(() => {
    fetchPageStats();
    fetchDailyStats(selectedPeriod);
    fetchRealTimeStats();
    const interval = setInterval(fetchRealTimeStats, 60000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const fmt = (d: Date | string) => new Date(d).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
  const fmtDT = (d: Date | string) => new Date(d).toLocaleString('ja-JP');
  const totalViews = pageStats.reduce((s, p) => s + p.totalViews, 0);
  const topPages = [...pageStats].sort((a, b) => b.totalViews - a.totalViews).slice(0, 5);

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>📊 ページインプレッション分析</h2>
        <div className="analytics-controls">
          <select value={selectedPeriod} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedPeriod(parseInt(e.target.value))} className="period-select">
            <option value={7}>過去7日間</option>
            <option value={30}>過去30日間</option>
            <option value={90}>過去90日間</option>
          </select>
          <button onClick={fetchPageStats} className="refresh-btn">🔄 更新</button>
        </div>
      </div>

      <div className="real-time-stats">
        <h3>📈 リアルタイム統計</h3>
        <div className="real-time-grid">
          <div className="stat-card real-time"><h4>過去1時間のビュー</h4><span className="stat-number">{realTimeStats.totalViewsLastHour ?? 0}</span></div>
          <div className="stat-card real-time"><h4>アクティブページ数</h4><span className="stat-number">{realTimeStats.activePages ?? 0}</span></div>
        </div>
      </div>

      <div className="overview-stats">
        <h3>📋 全体統計</h3>
        <div className="overview-grid">
          <div className="stat-card overview"><h4>総ページビュー</h4><span className="stat-number">{totalViews}</span></div>
          <div className="stat-card overview"><h4>ページ数</h4><span className="stat-number">{pageStats.length}</span></div>
          <div className="stat-card overview"><h4>平均ビュー/ページ</h4><span className="stat-number">{pageStats.length > 0 ? Math.round(totalViews / pageStats.length) : 0}</span></div>
        </div>
      </div>

      <div className="page-stats">
        <h3>📄 ページ別統計</h3>
        {isLoading ? (
          <div className="loading"><div className="loading-spinner"></div><p>読み込み中...</p></div>
        ) : (
          <div className="page-stats-list">
            {topPages.map((page, i) => (
              <div key={page.pageName} className="page-stat-card">
                <div className="page-stat-header">
                  <div className="page-rank">#{i + 1}</div>
                  <div className="page-name">{page.pageName}</div>
                  <div className="page-views">{page.totalViews} ビュー</div>
                </div>
                <div className="page-stat-details">
                  <div className="detail-item"><span className="label">ユニークビュー:</span><span className="value">{page.uniqueViews}</span></div>
                  <div className="detail-item"><span className="label">最終閲覧:</span><span className="value">{page.lastViewed ? fmtDT(page.lastViewed) : 'なし'}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="daily-stats">
        <h3>📅 日別統計（過去{selectedPeriod}日間）</h3>
        <div className="daily-stats-table">
          <div className="table-header">
            {['日付','ホーム','予約・お問い合わせ','合計'].map(h => <div key={h} className="header-cell">{h}</div>)}
          </div>
          {Object.entries(dailyStats)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .slice(0, 14)
            .map(([date, stats]) => {
              const total = (stats['Home'] ?? 0) + (stats['Booking'] ?? 0);
              return (
                <div key={date} className="table-row">
                  <div className="cell date">{fmt(date)}</div>
                  <div className="cell">{stats['Home'] ?? 0}</div>
                  <div className="cell">{stats['Booking'] ?? 0}</div>
                  <div className="cell total">{total}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="detailed-stats">
        <h3>🔍 詳細統計</h3>
        <div className="detailed-stats-grid">
          {pageStats.map(page => (
            <div key={page.pageName} className="detailed-stat-card">
              <h4>{page.pageName}</h4>
              <div className="stat-details">
                <div className="stat-item"><span className="label">総ビュー数:</span><span className="value">{page.totalViews}</span></div>
                <div className="stat-item"><span className="label">ユニークビュー:</span><span className="value">{page.uniqueViews}</span></div>
                <div className="stat-item"><span className="label">最終閲覧:</span><span className="value">{page.lastViewed ? fmtDT(page.lastViewed) : 'なし'}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

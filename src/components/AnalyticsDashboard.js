import React, { useState, useEffect } from 'react';
import { getPageViewStats, getDailyPageViewStats, getRealTimeStats } from '../services/analyticsService';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [pageStats, setPageStats] = useState([]);
  const [dailyStats, setDailyStats] = useState({});
  const [realTimeStats, setRealTimeStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  // ページ統計を取得
  const fetchPageStats = async () => {
    try {
      setIsLoading(true);
      const stats = await getPageViewStats();
      setPageStats(stats);
    } catch (error) {
      console.error('ページ統計取得エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 日別統計を取得
  const fetchDailyStats = async (days) => {
    try {
      const stats = await getDailyPageViewStats(days);
      setDailyStats(stats);
    } catch (error) {
      console.error('日別統計取得エラー:', error);
    }
  };

  // リアルタイム統計を取得
  const fetchRealTimeStats = async () => {
    try {
      const stats = await getRealTimeStats();
      setRealTimeStats(stats);
    } catch (error) {
      console.error('リアルタイム統計取得エラー:', error);
    }
  };

  useEffect(() => {
    fetchPageStats();
    fetchDailyStats(selectedPeriod);
    fetchRealTimeStats();

    // リアルタイム統計を定期的に更新
    const interval = setInterval(fetchRealTimeStats, 60000); // 1分ごと

    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('ja-JP');
  };

  const getTotalViews = () => {
    return pageStats.reduce((sum, stat) => sum + stat.totalViews, 0);
  };

  const getTopPages = () => {
    return pageStats
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5);
  };

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>📊 ページインプレッション分析</h2>
        <div className="analytics-controls">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
            className="period-select"
          >
            <option value={7}>過去7日間</option>
            <option value={30}>過去30日間</option>
            <option value={90}>過去90日間</option>
          </select>
          <button onClick={fetchPageStats} className="refresh-btn">
            🔄 更新
          </button>
        </div>
      </div>

      {/* リアルタイム統計 */}
      <div className="real-time-stats">
        <h3>📈 リアルタイム統計</h3>
        <div className="real-time-grid">
          <div className="stat-card real-time">
            <h4>過去1時間のビュー</h4>
            <span className="stat-number">{realTimeStats.totalViewsLastHour || 0}</span>
          </div>
          <div className="stat-card real-time">
            <h4>アクティブページ数</h4>
            <span className="stat-number">{realTimeStats.activePages || 0}</span>
          </div>
        </div>
      </div>

      {/* 全体統計 */}
      <div className="overview-stats">
        <h3>📋 全体統計</h3>
        <div className="overview-grid">
          <div className="stat-card overview">
            <h4>総ページビュー</h4>
            <span className="stat-number">{getTotalViews()}</span>
          </div>
          <div className="stat-card overview">
            <h4>ページ数</h4>
            <span className="stat-number">{pageStats.length}</span>
          </div>
          <div className="stat-card overview">
            <h4>平均ビュー/ページ</h4>
            <span className="stat-number">
              {pageStats.length > 0 ? Math.round(getTotalViews() / pageStats.length) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* ページ別統計 */}
      <div className="page-stats">
        <h3>📄 ページ別統計</h3>
        {isLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>読み込み中...</p>
          </div>
        ) : (
          <div className="page-stats-list">
            {getTopPages().map((page, index) => (
              <div key={page.pageName} className="page-stat-card">
                <div className="page-stat-header">
                  <div className="page-rank">#{index + 1}</div>
                  <div className="page-name">{page.pageName}</div>
                  <div className="page-views">{page.totalViews} ビュー</div>
                </div>
                <div className="page-stat-details">
                  <div className="detail-item">
                    <span className="label">ユニークビュー:</span>
                    <span className="value">{page.uniqueViews}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">最終閲覧:</span>
                    <span className="value">
                      {page.lastViewed ? formatDateTime(page.lastViewed) : 'なし'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 日別統計 */}
      <div className="daily-stats">
        <h3>📅 日別統計（過去{selectedPeriod}日間）</h3>
        <div className="daily-stats-table">
          <div className="table-header">
            <div className="header-cell">日付</div>
            <div className="header-cell">ホーム</div>
            <div className="header-cell">予約・お問い合わせ</div>
            <div className="header-cell">合計</div>
          </div>
          {Object.entries(dailyStats)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .slice(0, 14) // 直近14日間のみ表示
            .map(([date, stats]) => {
              const total = (stats.Home || 0) + (stats.Booking || 0);
              return (
                <div key={date} className="table-row">
                  <div className="cell date">{formatDate(date)}</div>
                  <div className="cell">{stats.Home || 0}</div>
                  <div className="cell">{stats.Booking || 0}</div>
                  <div className="cell total">{total}</div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 詳細統計 */}
      <div className="detailed-stats">
        <h3>🔍 詳細統計</h3>
        <div className="detailed-stats-grid">
          {pageStats.map((page) => (
            <div key={page.pageName} className="detailed-stat-card">
              <h4>{page.pageName}</h4>
              <div className="stat-details">
                <div className="stat-item">
                  <span className="label">総ビュー数:</span>
                  <span className="value">{page.totalViews}</span>
                </div>
                <div className="stat-item">
                  <span className="label">ユニークビュー:</span>
                  <span className="value">{page.uniqueViews}</span>
                </div>
                <div className="stat-item">
                  <span className="label">最終閲覧:</span>
                  <span className="value">
                    {page.lastViewed ? formatDateTime(page.lastViewed) : 'なし'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="label">平均セッション時間:</span>
                  <span className="value">計算中...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

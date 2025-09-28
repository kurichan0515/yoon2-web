import React from 'react';
import './QRCodes.css';

const QRCodes = () => {
  // シンプルなプレースホルダー画像生成
  const generateQRPlaceholder = (type, color) => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
        <rect width="300" height="300" fill="white"/>
        <rect x="20" y="20" width="60" height="60" fill="${color}" rx="8"/>
        <rect x="30" y="30" width="40" height="40" fill="white"/>
        <rect x="40" y="40" width="20" height="20" fill="${color}"/>
        <rect x="220" y="20" width="60" height="60" fill="${color}" rx="8"/>
        <rect x="230" y="30" width="40" height="40" fill="white"/>
        <rect x="240" y="40" width="20" height="20" fill="${color}"/>
        <rect x="20" y="220" width="60" height="60" fill="${color}" rx="8"/>
        <rect x="30" y="230" width="40" height="40" fill="white"/>
        <rect x="40" y="240" width="20" height="20" fill="${color}"/>
        <rect x="130" y="130" width="40" height="40" fill="white" stroke="${color}" stroke-width="2" rx="4"/>
        <text x="150" y="155" font-family="Arial" font-size="18" fill="${color}" text-anchor="middle">${type}</text>
      </svg>
    `)}`;
  };

  return (
    <section className="qr-codes-section section">
      <div className="container">
        <div className="section-header">
          <h2>最新情報やお得なキャンペーン情報をお届けします</h2>
          <div className="sns-icons">
            <a href="https://www.instagram.com/yoo.n.yoo.n/" target="_blank" rel="noopener noreferrer" className="sns-link">
              Instagram
            </a>
            <a href="https://lin.ee/lyyKSqu" target="_blank" rel="noopener noreferrer" className="sns-link">
              LINE
            </a>
          </div>
          <p>ご予約やお問い合わせは公式LINEにメッセージをお願いします</p>
        </div>
        
        <div className="qr-codes-container">
          <div className="qr-code-card">
            <div className="qr-code-header">
              <span className="qr-icon">💬</span>
              <h3>公式LINE</h3>
              <p>ご予約・お問い合わせはこちら</p>
            </div>
            <div className="qr-code-image">
              <img src={generateQRPlaceholder('LINE', '#00c300')} alt="LINE QRコード" />
            </div>
            <div className="qr-code-footer">
              <p className="qr-instruction">QRコードを読み取って友だち追加</p>
              <a 
                href="https://lin.ee/lyyKSqu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary qr-button"
              >
                LINEで予約
              </a>
            </div>
          </div>

          <div className="qr-code-card">
            <div className="qr-code-header">
              <span className="qr-icon">📷</span>
              <h3>公式Instagram</h3>
              <p>施術例・最新情報をチェック</p>
            </div>
            <div className="qr-code-image">
              <img src={generateQRPlaceholder('IG', '#ff6347')} alt="Instagram QRコード" />
            </div>
            <div className="qr-code-footer">
              <p className="qr-instruction">@yoo.n.yoo.n</p>
              <a 
                href="https://www.instagram.com/yoo.n.yoo.n/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary qr-button"
              >
                Instagramを見る
              </a>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <div className="contact-note">
            <h4>📞 お電話でのお問い合わせについて</h4>
            <p>お電話に出ることができません。ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
          </div>
          
          <div className="qr-note">
            <p>
              <strong>📱 QRコードについて:</strong><br/>
              上記のQRコードはプレースホルダーです。実際のLINEとInstagramのQRコード画像に置き換えることで、
              お客様がスマートフォンで直接アクセスできるようになります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodes;
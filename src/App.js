import React, { useState } from 'react';
import './App.css';

function App() {
  const [maxNumber, setMaxNumber] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleDraw = () => {
    if (maxNumber < 1) {
      alert('範囲は1以上の数字を入力してください');
      return;
    }
    // 1から指定した範囲内でランダムな数字を生成（直前の数字を除く）
    let randomNum;
    if (maxNumber === 1) {
      randomNum = 1;
    } else {
      do {
        randomNum = Math.floor(Math.random() * maxNumber) + 1;
      } while (randomNum === selectedNumber);
    }
    setSelectedNumber(randomNum);
    
    // 箱を揺らすアニメーション開始
    setIsShaking(true);
    
    // 1秒後(揺らし0.5秒 × 2回)にアニメーション停止、その後0.5秒待ってモーダル表示
    setTimeout(() => {
      setIsShaking(false);
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>くじ引きアプリ</h1>
        
        <div className="input-section">
          <label htmlFor="maxNumber">範囲指定（1～）:</label>
          <input
            id="maxNumber"
            type="number"
            min="1"
            value={maxNumber}
            onChange={(e) => setMaxNumber(parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="box-container">
          <img 
            src="/box.png" 
            alt="くじ引き箱" 
            className={`box-image ${isShaking ? 'shaking' : ''}`} 
          />
        </div>

        <button className="draw-button" onClick={handleDraw}>
          抽選する
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>抽選結果</h2>
            <div className="result-number">{selectedNumber}</div>
            <button className="close-button" onClick={closeModal}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

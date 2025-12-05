import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [maxNumber, setMaxNumber] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);

  // maxNumberが変更されたら利用可能な番号リストを更新
  useEffect(() => {
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    setAvailableNumbers(numbers);
    setDrawnNumbers([]);
  }, [maxNumber]);

  const handleDraw = () => {
    if (maxNumber < 1) {
      alert('範囲は1以上の数字を入力してください');
      return;
    }
    
    // 未抽選の番号を取得
    const remaining = availableNumbers.filter(num => !drawnNumbers.includes(num));
    
    if (remaining.length === 0) {
      alert('全員抽選済みです。リセットボタンを押してください。');
      return;
    }
    
    // 未抽選の番号からランダムに選択
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const randomNum = remaining[randomIndex];
    
    setSelectedNumber(randomNum);
    
    // 箱を揺らすアニメーション開始
    setIsShaking(true);
    
    // 1秒後(揺らし0.5秒 × 2回)にアニメーション停止、その後0.5秒待ってモーダル表示
    setTimeout(() => {
      setIsShaking(false);
      setTimeout(() => {
        setShowModal(true);
        // 抽選済みリストに追加
        setDrawnNumbers(prev => [...prev, randomNum]);
      }, 500);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleReset = () => {
    setDrawnNumbers([]);
    setSelectedNumber(null);
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="side-panel left-panel">
          <h3>未抽選</h3>
          <div className="number-list">
            {availableNumbers
              .filter(num => !drawnNumbers.includes(num))
              .map(num => (
                <div key={num} className="number-item available">
                  {num}
                </div>
              ))}
          </div>
        </div>

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
              src={`${process.env.PUBLIC_URL}/box.png`}
              alt="くじ引き箱" 
              className={`box-image ${isShaking ? 'shaking' : ''}`} 
            />
          </div>

          <div className="button-group">
            <button className="draw-button" onClick={handleDraw}>
              抽選する
            </button>
            <button className="reset-button" onClick={handleReset}>
              リセット
            </button>
          </div>
        </div>

        <div className="side-panel right-panel">
          <h3>抽選済み</h3>
          <div className="number-list">
            {drawnNumbers.map(num => (
              <div key={num} className="number-item drawn">
                {num}
              </div>
            ))}
          </div>
        </div>
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

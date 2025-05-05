// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchPageBlocks } from './NotionApi';  // 修正済み

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<any[]>([]);  // データ格納用のステート
  const [error, setError] = useState<string>('');  // エラーメッセージ用のステート

  useEffect(() => {
    const pageId = '1d7f2b9e237d8017b54fc492f9cc3308';  // 実際のページIDに置き換えてください

    // fetchPageBlocks 関数を呼び出し
    fetchPageBlocks(pageId)
      .then((data) => {
        console.log("Notionから取得したデータ:", data);  // 👈 ここ追加！
        setBlocks(data);  // 成功した場合、取得したデータをステートにセット
      })
      .catch((err) => {
        setError(`Error: ${err.message}`);  // エラーが発生した場合、エラーメッセージをセット
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notion Page Blocks</h1>
        {error ? (
          <p>{error}</p>  // エラーがあれば表示
        ) : (
          <ul>
            {blocks.map((block, index) => (
              <li key={index}>
                {block.type}: {JSON.stringify(block)}  {/* ブロックのタイプと内容を表示 */}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;

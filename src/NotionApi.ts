// src/NotionApi.ts

import axios from 'axios';

// Notion APIのインスタンス作成
const notionApi = axios.create({
  baseURL: 'https://api.notion.https://api.notion.com/v1/blocks/1d7f2b9e-237d-8017-b54f-c492f9cc3308/children/v1/',
  headers: {
    'Authorization': 'Bearer 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',  // 自分のNotionのAPIトークンに置き換え
    'Notion-Version': '2022-06-28',  // 最新のAPIバージョンに設定
  },
});

// APIから取得したデータ型
interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

// ページのブロックを取得する関数
export const fetchPageBlocks = async (pageId: string): Promise<NotionBlock[]> => {
  try {
    const response = await notionApi.get(`/blocks/${pageId}/children`);
    return response.data.results;
  } catch (error: any) {
    console.error('Error fetching page blocks from Notion API:', error);
    throw error;
  }
};

// 必要に応じて他の関数もエクスポート
export const fetchNotionData = async (databaseId: string) => {
  try {
    const response = await notionApi.post(`databases/${databaseId}/query`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data from Notion API:', error);
    throw error;
  }
};

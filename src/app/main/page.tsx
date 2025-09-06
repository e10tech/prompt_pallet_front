// app/main/page.tsx
"use client";

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

// --- 型定義 ---
// APIから受け取るデータ構造を定義します
interface Category {
  id: number;
  name: string;
}

interface Subcategory {
  id: number;
  category_id: number;
  name: string;
}

interface PromptPublic {
  id: number;
  category_id: number;
  subcategory_id: number;
  prompt: string;
  japanese_label: string;
  is_positive: boolean;
  owner_id: string | null;
  source: string;
}

// APIのベースURL
//下記はRender.comにデプロイしたバックエンドのURL
const API_BASE_URL = 'https://prompt-pallet-back.onrender.com/api/v1';
//下記はローカル開発用。デプロイ時には環境変数などで切り替える想定
//const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// --- メインページコンポーネント ---
const MainPage: NextPage = () => {
  // --- State管理 ---
  // 各リストのデータ
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [prompts, setPrompts] = useState<PromptPublic[]>([]);

  // ユーザーが選択したID
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);

  // 上部のテキストエリアのテキスト
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');

  // --- データ取得ロジック ---
  // ページ読み込み時にカテゴリ一覧を取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // カテゴリが選択されたら、サブカテゴリとプロンプトを再取得
  useEffect(() => {
    const fetchSubcategoriesAndPrompts = async () => {
      // カテゴリが選択されていない場合は何もしない
      if (selectedCategoryId === null) {
        setSubcategories([]);
        fetchPrompts(null, null); // 全てのプロンプトを取得
        return;
      }

      // サブカテゴリを取得
      try {
        const res = await fetch(`${API_BASE_URL}/subcategories?category_id=${selectedCategoryId}`);
        const data: Subcategory[] = await res.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
        setSubcategories([]); // エラー時は空にする
      }
      
      // プロンプトを再取得
      fetchPrompts(selectedCategoryId, null);
    };

    fetchSubcategoriesAndPrompts();
  }, [selectedCategoryId]);

  // サブカテゴリが選択されたら、プロンプトを再取得
  useEffect(() => {
    fetchPrompts(selectedCategoryId, selectedSubcategoryId);
  }, [selectedSubcategoryId, selectedCategoryId]);


  // プロンプトを取得する共通関数
  const fetchPrompts = async (catId: number | null, subcatId: number | null) => {
    const url = `${API_BASE_URL}/prompts?`;
    const params = new URLSearchParams();
    if (catId) {
      params.append('category_id', String(catId));
    }
    if (subcatId) {
      params.append('subcategory_id', String(subcatId));
    }
    try {
      const res = await fetch(url + params.toString());
      const data: PromptPublic[] = await res.json();
      setPrompts(data);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
    }
  };

  // --- イベントハンドラ ---
  const handleCategorySelect = (id: number | null) => {
    setSelectedCategoryId(id);
    setSelectedSubcategoryId(null); // サブカテゴリの選択をリセット
  };

  const handleSubcategorySelect = (id: number | null) => {
    setSelectedSubcategoryId(id);
  };

  const handlePromptClick = (prompt: PromptPublic) => {
    const newText = prompt.prompt;
    if (prompt.is_positive) {
      setPositivePrompt(prev => prev ? `${prev}, ${newText}` : newText);
    } else {
      setNegativePrompt(prev => prev ? `${prev}, ${newText}` : newText);
    }
  };
  
  // クリップボードにコピー
  const handleCopyToClipboard = () => {
    const textToCopy = `Prompt: ${positivePrompt}\nNegative prompt: ${negativePrompt}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('クリップボードにコピーしました！');
    }).catch(err => {
      console.error('コピーに失敗しました', err);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* --- ヘッダー --- */}
      <header className="py-4 px-6 bg-stone-100 border-b border-stone-200">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Image src="/icons/icon_pencil.svg" alt="Prompt Pallet Logo" width={32} height={32} />
            <span className="text-xl font-semibold text-gray-800">Prompt Pallet</span>
          </div>
        </div>
      </header>

      {/* --- メインコンテンツ --- */}
      <main className="flex-grow container mx-auto p-6 space-y-6">
        {/* 上部エリア */}
        <div className="space-y-4">
          <div className="flex justify-end items-center space-x-2">
            <button className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 rounded-full text-gray-800">登録する</button>
            <button className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 rounded-full text-gray-800">整列する</button>
            <button 
              onClick={handleCopyToClipboard}
              className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 rounded-full text-gray-800">
              クリップボードにコピー
            </button>
          </div>
          
          <div>
            <label htmlFor="positive-prompt" className="text-sm font-medium text-gray-700">Prompt</label>
            <textarea
              id="positive-prompt"
              value={positivePrompt}
              onChange={(e) => setPositivePrompt(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md bg-stone-100 border-transparent focus:border-stone-400 focus:bg-white focus:ring-0"
              placeholder="Value"
            />
          </div>

          <div>
            <label htmlFor="negative-prompt" className="text-sm font-medium text-gray-700">Negative prompt</label>
            <textarea
              id="negative-prompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md bg-stone-100 border-transparent focus:border-stone-400 focus:bg-white focus:ring-0"
              placeholder="Value"
            />
          </div>
        </div>

        {/* フィルターエリア */}
        <div className="flex items-center space-x-6 text-sm">
          <input type="text" placeholder="絞り込み(入力検索)" className="px-4 py-2 border border-stone-300 rounded-full w-48" />
          <div className="flex items-center">
            <input id="fav" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="fav" className="ml-2 text-gray-700">お気に入り</label>
          </div>
          <div className="flex items-center">
            <input id="original" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="original" className="ml-2 text-gray-700">オリジナル</label>
          </div>
          <div className="flex items-center">
            <input id="nsfw" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="nsfw" className="ml-2 text-gray-700">NSFW(登録時18歳未満なら非表示)</label>
          </div>
        </div>

        {/* プロンプトリストエリア */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* カテゴリリスト */}
          <div className="bg-stone-100 rounded-lg p-2 shadow-sm h-80 flex flex-col">
            <ul className="overflow-y-auto space-y-1 text-sm">
              <li
                onClick={() => handleCategorySelect(null)}
                className={`p-2 rounded-md cursor-pointer ${selectedCategoryId === null ? 'bg-stone-300 font-semibold' : 'hover:bg-stone-200'}`}
              >
                全て
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-2 rounded-md cursor-pointer ${selectedCategoryId === cat.id ? 'bg-stone-300 font-semibold' : 'hover:bg-stone-200'}`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          {/* サブカテゴリリスト */}
          <div className="bg-stone-100 rounded-lg p-2 shadow-sm h-80 flex flex-col">
            <ul className="overflow-y-auto space-y-1 text-sm">
              <li
                onClick={() => handleSubcategorySelect(null)}
                className={`p-2 rounded-md cursor-pointer ${selectedSubcategoryId === null ? 'bg-stone-300 font-semibold' : 'hover:bg-stone-200'}`}
              >
                全て
              </li>
              {subcategories.map((subcat) => (
                <li
                  key={subcat.id}
                  onClick={() => handleSubcategorySelect(subcat.id)}
                  className={`p-2 rounded-md cursor-pointer ${selectedSubcategoryId === subcat.id ? 'bg-stone-300 font-semibold' : 'hover:bg-stone-200'}`}
                >
                  {subcat.name}
                </li>
              ))}
            </ul>
          </div>

          {/* プロンプトリスト */}
          <div className="bg-stone-100 rounded-lg p-2 shadow-sm h-80 flex flex-col">
            <ul className="overflow-y-auto space-y-1 text-sm">
              {prompts.map((p) => (
                <li
                  key={`${p.source}-${p.id}`}
                  onClick={() => handlePromptClick(p)}
                  className="p-2 rounded-md cursor-pointer hover:bg-stone-200 grid grid-cols-3 gap-2 items-center"
                >
                  <span className="col-span-1 truncate">{p.prompt}</span>
                  <span className="col-span-1 truncate text-gray-600">{p.japanese_label}</span>
                  <span className={`col-span-1 text-right text-xs ${p.source === 'user_public' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {p.source === 'user_public' ? 'オリジナル' : 'デフォルト'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* --- フッター --- */}
      <footer className="py-6 px-6 bg-stone-100 border-t border-stone-200">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/terms" className="hover:underline">利用規約</a>
            <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
            <a href="/help" className="hover:underline">ヘルプ</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">X(旧Twitter)</a>
            <a href="/contact" className="hover:underline">お問い合わせ</a>
          </div>
          <p>&copy; 2025 Prompt Pallet</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
// app/login/page.tsx

import type { NextPage } from 'next';
import Image from 'next/image'; // Next.jsで画像を表示するために使用

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center">
          {/* ロゴとサービス名 */}
          <div className="flex items-center space-x-2">
            {/* ここにロゴのSVGや画像ファイルを指定します */}
            <svg
              className="w-8 h-8 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 仮のアイコンです。実際のロゴに置き換えてください */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-xl font-semibold text-gray-800">Prompt Pallet</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">ログイン</h2>

          {/* ログインボタン */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {/* Googleアイコン */}
              <Image src="/google-logo.svg" alt="Google" width={20} height={20} className="mr-2" />
              Googleでログイン
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
            >
              {/* Xアイコン */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Xでログイン
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
               {/* Discordアイコン */}
               <Image src="/discord-logo.svg" alt="Discord" width={20} height={20} className="mr-2" />
              Discordでログイン
            </button>
          </div>

          {/* 同意文言 */}
          <p className="text-xs text-center text-gray-500">
            このサービスを利用することで、「<a href="/terms" className="underline hover:text-gray-700">利用規約</a>」と「<a href="/privacy" className="underline hover:text-gray-700">プライバシーポリシー</a>」に同意したものとみなされます
          </p>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-6 px-6 mt-12 bg-gray-100">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/terms" className="hover:underline">利用規約</a>
            <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
            <a href="/help" className="hover:underline">ヘルプ</a>
            <a href="https://twitter.com/your_account" target="_blank" rel="noopener noreferrer" className="hover:underline">X(旧Twitter)</a>
            <a href="/contact" className="hover:underline">お問い合わせ</a>
          </div>
          <p>&copy; 2025 Prompt Pallet</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
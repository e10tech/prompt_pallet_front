// app/login/page.tsx

import type { NextPage } from 'next';
import Image from 'next/image';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="py-4 px-6 bg-stone-100">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Image src="/icons/icon_pencil.svg" alt="Prompt Pallet ロゴ" width={32} height={32} />
            <span className="text-xl font-semibold text-gray-800">Prompt Pallet</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm p-8 space-y-8 bg-stone-100 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-900">ログイン</h2>

          {/* ログインボタン */}
          <div className="space-y-4">
            {/* 変更点: ボタンに relative を追加し、アイコンを absolute で配置 */}
            <button
              type="button"
              className="w-full relative flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
            >
              <Image
                src="/icons/icon_google.svg"
                alt="Google"
                width={20}
                height={20}
                className="absolute left-6" // アイコンを左から配置
              />
              <span>Googleでログイン</span>
            </button>
            <button
              type="button"
              className="w-full relative flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-100"
            >
              <Image
                src="/icons/icon_x.svg"
                alt="X"
                width={20}
                height={20}
                className="absolute left-6" // アイコンを左から配置
              />
              <span>Xでログイン</span>
            </button>
            <button
              type="button"
              className="w-full relative flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-100"
            >
              <Image
                src="/icons/icon_discord.svg"
                alt="Discord"
                width={20}
                height={20}
                className="absolute left-6" // アイコンを左から配置
              />
              <span>Discordでログイン</span>
            </button>
          </div>
          {/* 同意文言 */}
          <p className="text-xs text-center text-gray-500">
            このサービスを利用することで、「<a href="/terms" className="underline hover:text-gray-700">利用規約</a>」と「<a href="/privacy" className="underline hover:text-gray-700">プライバシーポリシー</a>」に同意したものとみなされます
          </p>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-6 px-6 bg-stone-100">
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
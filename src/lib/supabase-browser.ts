import { createClient } from '@supabase/supabase-js';

// .env.local にセットした環境変数を使って、ブラウザ用の Supabase クライアントを作成
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // ← プロジェクトURL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // ← anonキー（公開OKな方）
  {
    auth: {
      persistSession: true,    // ローカルにセッション保存（再読み込みしてもログイン維持）
      autoRefreshToken: true,  // 期限切れ前にトークンを自動更新
    },
  }
);

// src/app/login/page.tsx
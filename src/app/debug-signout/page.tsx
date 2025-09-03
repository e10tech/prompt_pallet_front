'use client';
import { supabase } from '@/lib/supabase-browser';

export default function DebugSignOut() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    else alert('サインアウトしました');
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded bg-stone-200 hover:bg-stone-300"
    >
      ログアウト
    </button>
  );
}

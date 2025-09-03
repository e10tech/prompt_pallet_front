// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setEmail(session.user.email ?? '(no email)');
    })();
  }, [router]);

  return (
    <div className="p-8">
      ✅ ログイン成功！ {email}
      <div className="mt-4">
        <button
          className="px-4 py-2 rounded bg-stone-200 hover:bg-stone-300"
          onClick={() => router.push('/debug-signout')}
        >
          debug-signoutへ
        </button>
      </div>
    </div>
  );
}

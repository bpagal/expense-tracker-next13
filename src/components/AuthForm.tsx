'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../utils/database.types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/account');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{
        theme: ThemeSupa,
        style: {
          button: {
            backgroundColor: '#2563eb',
            border: 0,
          },
          input: {
            backgroundColor: '#1f2937',
          },
          label: {
            color: 'white',
          },
        },
      }}
      theme="dark"
      showLinks={false}
      providers={[]}
    />
  );
}

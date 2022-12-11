import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  // TODO improve this logic when Auth props.redirectTo is working
  useEffect(() => {
    if (session) {
      router.reload();
    }
  }, [session, router]);

  return (
    <Container>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#1e90ff',
                brandAccent: '#1e90ff',
              },
            },
          },
        }}
        theme="dark"
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (sspContext) => {
  const supabaseClient = createServerSupabaseClient(sspContext);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: '/?page=1',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

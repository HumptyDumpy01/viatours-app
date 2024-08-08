import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function loginIsRequiredClient() {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: session, status } = useSession();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/');
    }
  }
}

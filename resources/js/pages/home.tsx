import { BaseLayout } from '@/components/layout/base';
import type { ReactNode } from 'react';

export default function Home() {
  return null;
}

Home.layout = (page: ReactNode) => <BaseLayout head={{ title: 'Find Your Next Career' }}>{page}</BaseLayout>;

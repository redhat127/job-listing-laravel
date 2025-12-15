import { BaseLayout } from '@/components/layout/base';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import companyRoute from '@/routes/company';
import type { Company } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilLineIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Company({ company }: { company: Company }) {
  return (
    <>
      <Head title={generateTitle(`My Company - ${company.name}`)} />
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold capitalize">{company.name}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={companyRoute.job.create()}>
              <PencilLineIcon className="size-4" />
              Post a Job
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

Company.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

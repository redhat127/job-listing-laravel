import { PostJobForm } from '@/components/form/company/post-job-form';
import { BaseLayout } from '@/components/layout/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

export default function CompanyPostJob() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold">Post a New Job</h1>
        </CardTitle>
        <CardDescription>Post a new job opening and start receiving applications from qualified candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <PostJobForm />
      </CardContent>
    </Card>
  );
}

CompanyPostJob.layout = (page: ReactNode) => <BaseLayout head={{ title: 'Post a Job' }}>{page}</BaseLayout>;

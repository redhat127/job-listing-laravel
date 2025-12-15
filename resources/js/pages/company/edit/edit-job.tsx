import { PostJobForm } from '@/components/form/company/post-job-form';
import { BaseLayout } from '@/components/layout/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Job } from '@/types';
import type { ReactNode } from 'react';

export type EditJob = Omit<Job, 'company_id'>;

export default function CompanyEditJob({ job }: { job: EditJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold">Edit Job</h1>
        </CardTitle>
        <CardDescription>Edit your company job</CardDescription>
      </CardHeader>
      <CardContent>
        <PostJobForm job={job} />
      </CardContent>
    </Card>
  );
}

CompanyEditJob.layout = (page: ReactNode) => <BaseLayout head={{ title: 'Edit Job' }}>{page}</BaseLayout>;

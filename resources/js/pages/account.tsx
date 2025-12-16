import { ProfileDetailsForm } from '@/components/form/account/profile-details';
import { BaseLayout } from '@/components/layout/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

export default function Account() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle>
            <h1 className="font-bold">Account</h1>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="font-bold">Profile Details</h2>
          </CardTitle>
          <CardDescription>Use inputs below to update your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm />
        </CardContent>
      </Card>
    </div>
  );
}

Account.layout = (page: ReactNode) => <BaseLayout head={{ title: 'Account' }}>{page}</BaseLayout>;

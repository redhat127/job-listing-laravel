import type { experienceLevels, jobStatus, jobTypes } from '@/zod-schema/company/post-job-schema';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  onboarding_completed: boolean;
  user_type?: 'company' | 'job_seeker';
}

export type SharedPropAuth = {
  auth?: Pick<
    User,
    'id' | 'name' | 'username' | 'email' | 'email_verified_at' | 'created_at' | 'updated_at' | 'avatar' | 'onboarding_completed' | 'user_type'
  >;
};

export type SharedFlashMessage = {
  flashMessage?: {
    type: 'error' | 'success';
    text: string;
  } & Record<string, unknown>;
};

export type Company = {
  name: string;
};

declare global {
  interface Window {
    turnstile?: {
      render(
        id: string,
        args: {
          sitekey: string;
          theme?: 'auto' | 'dark' | 'light';
          size?: 'normal' | 'flexible' | 'compact';
          callback(token: string): void;
          'error-callback': () => void;
        },
      ): string;
      reset: (widgetId: string) => void;
    };
  }
}

export type Job = {
  id: string;
  title: string;
  slug: string;
  requirements?: string;
  responsibilities?: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  is_remote: boolean;
  job_type: (typeof jobTypes)[number]['value'];
  experience_level: (typeof experienceLevels)[number]['value'];
  salary?: string;
  show_salary: boolean;
  skills?: string;
  benefits?: string;
  status: (typeof jobStatus)[number]['value'];
  company_id: string;
};

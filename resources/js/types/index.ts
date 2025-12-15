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

declare global {
  interface Window {
    turnstile?: {
      render(
        id: string,
        args: {
          sitekey: string;
          theme?: 'auth' | 'dark' | 'light';
          size?: 'normal' | 'flexible' | 'compact';
          callback(token: string): void;
          'error-callback': () => void;
        },
      ): string;
      reset: (widgetId: string) => void;
    };
  }
}

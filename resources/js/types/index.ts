export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export type SharedPropAuth = {
  auth?: Pick<User, 'id' | 'name' | 'username' | 'email' | 'email_verified_at' | 'created_at' | 'updated_at'>;
};

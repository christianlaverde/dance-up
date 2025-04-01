export enum UserRole {
  OWNER = 'owner',
  MEMBER = 'member'
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: UserRole;
};

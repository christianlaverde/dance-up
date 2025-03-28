export interface User {
  id: number;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: "owner" | "member";
};

export interface User {
  id: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: "owner" | "member";
};

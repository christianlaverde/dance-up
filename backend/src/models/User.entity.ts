interface User {
  id: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: "owner" | "member";
};

interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: "admin" | "student";
};

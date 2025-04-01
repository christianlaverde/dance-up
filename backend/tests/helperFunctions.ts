import { expect } from "@jest/globals";
import { UserRole } from "../src/models/user";

export function expectUserShape(user: any) {
  expect(user).toBeDefined();
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      first_name: expect.any(String),
      middle_name: expect.any(String),
      last_name: expect.any(String),
      role: expect.any(String),
    })
  );
  // Ensure user.role is of UserRole enum
  expect(Object.values(UserRole)).toContain(user.role);
}
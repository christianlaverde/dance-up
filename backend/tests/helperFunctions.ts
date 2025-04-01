import { expect } from "@jest/globals";
import { QueryConfig } from 'pg';
import { UserRole } from "../src/entities/user";

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

export function expectStudioShape(studio: any) {
  expect(studio).toBeDefined();
  expect(studio).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      owner_id: expect.any(String),
      studio_name: expect.any(String),
      address: expect.any(String)
    })
  );
}

// Reusable Mock Query Helper, returns mock query and getCapturedQuery functions
export function createMockQuery(returnedRows: any[]) {
  let capturedQuery: QueryConfig | undefined;
  const query = async (query: QueryConfig): Promise<{ rows: any[] }> => {
    capturedQuery = query;
    return { rows: returnedRows };
  }

  return { query, getCapturedQuery: () => capturedQuery };
}
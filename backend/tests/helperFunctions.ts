import { expect } from "@jest/globals";
import { QueryConfig } from 'pg';
import { UserRole } from "../src/entities/user";

/**
 * Verifies that the given user object is defined and matches the expected shape.
 * It checks for the presence of essential properties and confirms that `user.role`
 * is one of the values defined in the `UserRole` enum.
 *
 * @param {any} user - The user object to validate.
 */
export function expectUserShape(user: any): void {
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

/**
 * Verifies that the given studio object is defined and matches the expected shape.
 * It checks for the presence of essential properties such as `id`, `owner_id`,
 * `studio_name`, and `address`.
 *
 * @param {any} studio - The studio object to validate.
 */
export function expectStudioShape(studio: any): void {
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

/**
 * Verifies that the given class object is defined and matches the expected shape.
 * It checks for the presence of essential properties such as `id`, `studio_id`, and `name`.
 *
 * @param {any} cls - The class object to validate.
 */
export function expectClassShape(cls: any): void {
  expect(cls).toBeDefined();
  expect(cls).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      studio_id: expect.any(String),
      name: expect.any(String)
    })
  );
}

/**
 * Creates a reusable mock query helper.
 *
 * This helper returns an object with two properties:
 * - `query`: an asynchronous function that captures the provided query configuration
 *   and returns an object containing the provided `returnedRows`. Used to mock `Database`.
 * - `getCapturedQuery`: a function that returns the last captured query configuration.
 *
 * @param {any[]} returnedRows - An array of rows that will be returned when the mock query is executed.
 * @returns {{
*   query: (query: QueryConfig) => Promise<{ rows: any[] }>,
*   getCapturedQuery: () => QueryConfig | undefined
* }} An object containing the mock query function and a getter for the captured query.
*/
// Reusable Mock Query Helper, returns mock query and getCapturedQuery functions
export function createMockQuery(returnedRows: any[]) {
  let capturedQuery: QueryConfig | undefined;
  const query = async (query: QueryConfig): Promise<{ rows: any[] }> => {
    capturedQuery = query;
    return { rows: returnedRows };
  }

  return { query, getCapturedQuery: () => capturedQuery };
}
import { User } from "../domain/user.js"

export interface IStudioRepository {
  findAll(): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

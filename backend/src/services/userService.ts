import { UserModel } from "../models/UserModel.js";
import { User } from "../models/User.entity.js";

export class UserService {
  constructor(private userModel: UserModel) {
    this.userModel = userModel;
  }
  // Get All Users
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.getAllUsers();
    return users;
  };

  // Get User By ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.getUserById(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    return user;
  };

  // Get User By Email
  async getUserByEmail(email: string): Promise<User>  {
    const user = await this.userModel.getUserByEmail(email);
    if (!user) {
      throw new Error('User Not Found');
    }
    return user
  };

  // Create new User
  async createUser(
    email: string, 
    password_hash: string,
    first_name: string, 
    middle_name: string, 
    last_name: string, 
    role: string,
  ): Promise<User> {
    const newUser = this.userModel.insertUser(email, password_hash, first_name, middle_name, last_name, role);
    return newUser;
  };
}

import { User as CustomUser } from '../../models/user.js';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};
import { User as AppUser } from '../../models/User.entity';

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
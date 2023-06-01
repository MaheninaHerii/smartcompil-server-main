/**
 * Auth user interface
 */
import { UserRole } from "../../users/users.entity";

export interface IAuthUser {
  /**
   * usre id
   */
  id: number;

  /**
   * user email
   */
  email: string;

  /**
   * user roles array
   */
  roles: [UserRole];
}

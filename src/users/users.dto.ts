import { UserRole } from "./users.entity";

export class UsersDTO {

  id: number;

  email: string;

  password: string;

  roles: UserRole[];
}
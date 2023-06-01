import { UserRole } from "../../users/users.entity";

export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}
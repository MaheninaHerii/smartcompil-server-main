import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Exclude } from "class-transformer";

export type UserRole = 'admin' | 'user';

@Entity("user")
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**²e
   * email
   */
  @Unique('email', ['email'])
  @Column({ length: 320, nullable: false })
  email: string;

  /**
   * password
   */
  @Exclude()
  @Column({ length: 100, nullable: false })
  password: string;

  /**
   * user roles: admin, user
   */
  @Column('simple-array')
  roles: UserRole[];
}
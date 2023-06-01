import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UsersEntity } from "./users.entity";
import { UsersDTO } from "./users.dto";

@Injectable()
export class UsersService {
  /**
   * @ignore
   */
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>
  ) {
  }

  /**
   * create user
   */
  async createUser(userData: UsersDTO): Promise<UsersDTO> {
    const user = new UsersDTO();
    user.email = userData.email;
    user.password = await this.hashPassword(userData.password);
    user.roles = ["admin"];
    try {
      return this.userRepository.save(user);
    } catch (error) {
      // process email duplicate err msg
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error(`user already exists with email ${user.email}`);
      }

      throw error;
    }
  }

  async updatePassword(userData: UsersDTO): Promise<UsersDTO> {
    if (!!userData.password) {
      userData.password = await this.hashPassword(userData.password);
      await this.userRepository.update({ id: userData.id }, { password: userData.password });
    }
    return userData;
  }

  async updateEmail(userData: UsersDTO): Promise<UsersDTO> {
    if (!!userData.email) {
      await this.userRepository.update({ id: userData.id }, { email: userData.email });
    }
    return userData;
  }

  /**
   * get user by id
   */
  getUserById(id: number): Promise<UsersDTO> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * get user by email
   */
  getUserByEmail(email): Promise<UsersDTO> {
    return this.userRepository.findOne({ where: { email } });
  }


  async getUser(email: string): Promise<UsersDTO> {
    const user = await this.userRepository.findOne({ where: { email } });
    user.password = null;
    return user;
  }

  getAllUsers(): Promise<UsersDTO[]> {
    return this.userRepository.find();
  }

  /**
   * encrypt password
   */
  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(null);
        }

        bcrypt.hash(password, salt, (err2, hash) => {
          return err2 ? reject(null) : resolve(hash);
        });
      });
    });
  }

  /**
   * compare user password hash
   */
  checkPassword(user: UsersDTO, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, ok) => {
        return (error || !ok) ? resolve(false) : resolve(true);
      });
    });
  }

}

import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { LoginCredential } from "../dto/login-credential.dto";
import { TokenDto } from "../dto/token.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/users.service";
import { UsersDTO } from "../../users/users.dto";

/**
 * Auth service
 */
@Injectable()
export class AuthService {

  /**
   * @ignore
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  /**
   * register user
   */
  async registerUser(userData: UsersDTO): Promise<UsersDTO> {
    return this.userService.createUser(userData);
  }

  /**
   * login user
   */
  async login(credential: LoginCredential): Promise<TokenDto> {

    const user = await this.userService.getUserByEmail(credential.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new Error("Invalid credentials");
    }

    const authToken: TokenDto = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  /**
   * refresh token
   */
  async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {

    let payload: any;

    try {
      payload = this.jwtService.verify(token.refreshToken);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const { userId, type } = payload;

    if (type !== "refresh") {
      throw new Error("Wrong token type");
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error("Invalid user");
    }

    const authToken = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  /**
   * Generate Auth Token
   * @param user
   */
  private generateAuthToken(user: UsersDTO): TokenDto {

    const accessToken = this.jwtService.sign({
      sub: () => user.email,
      type: "access",
      email: user.email,
      roles: user.roles,
      userId: user.id
    });

    const refreshToken = this.jwtService.sign({
      sub: () => user.email,
      type: "refresh",
      userId: user.id
    });

    return { accessToken, refreshToken };
  }
}

import {
  Inject,
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from "@nestjs/common";
import { AuthService } from "./../../service/auth.service";
import { LoginCredential } from "./../../dto/login-credential.dto";
import { TokenDto } from "./../../dto/token.dto";
import { RefreshTokenDto } from "./../../dto/refresh-token.dto";
import { Logger } from "winston";
import { UsersDTO } from "../../../users/users.dto";
import { Roles, RolesGuard } from "../../../utils";

/**
 * Auth controller
 */
@Controller("/api/v1/auth")
export class AuthController {

  /**
   * @ignore
   */
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private readonly service: AuthService
  ) {
  }

  /**
   * Create new user
   */
  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post("register")
  @UseInterceptors(ClassSerializerInterceptor)
  async register(
    @Body() userDto: UsersDTO
  ): Promise<UsersDTO> {
    try {
      return await this.service.registerUser(userDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Login users
   */
  @Post("login")
  async login(
    @Body() credential: LoginCredential
  ): Promise<TokenDto> {
    try {
      return await this.service.login(credential);
    } catch (error) {
      this.logger.warn("Login attempt failed", credential);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Access token generation using refresh token
   */
  @Post("refresh-token")
  async refreshToken(
    @Body() token: RefreshTokenDto
  ): Promise<TokenDto> {
    try {
      return this.service.refreshToken(token);
    } catch (error) {
      this.logger.warn("Refresh token attempt failed", token);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

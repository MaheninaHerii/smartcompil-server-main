import {
  Get,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor, HttpCode, Put, Body, Param
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthUser, IAuthUser, Roles, RolesGuard } from "../utils";
import { UsersDTO } from "./users.dto";

/**
 * User controller
 */
@ApiTags("Utilisateur")
@Controller("/api/v1/user")
export class UsersController {

  /**
   * @ignore
   */
  constructor(
    private readonly service: UsersService
  ) {
  }

  /**
   * logged in user's profile
   */
  @Get("/me")
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles("admin")
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(
    @AuthUser() user: IAuthUser
  ): Promise<UsersDTO> {
    try {
      return await this.service.getUserByEmail(user.email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get all user list
   */
  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles("admin")
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUser(): Promise<UsersDTO[]> {
    try {
      return await this.service.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":email")
  @HttpCode(HttpStatus.OK)
  async getUser(@Param("email") email: string): Promise<UsersDTO> {
    return await this.service.getUser(email);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updatePassword")
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() data: UsersDTO): Promise<UsersDTO> {
    return await this.service.updatePassword(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateEmail")
  @HttpCode(HttpStatus.OK)
  async updateEmail(@Body() data: UsersDTO): Promise<UsersDTO> {
    return await this.service.updateEmail(data);
  }
}

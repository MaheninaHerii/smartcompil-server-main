import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth/auth.controller";
import { SharedModule } from "../shared/shared.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SharedModule)
  ],
  providers: [
    AuthService
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {
}

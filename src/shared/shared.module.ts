import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constant";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "60m" }
    })
  ],
  exports: [
    JwtModule
  ]
})
export class SharedModule {
}

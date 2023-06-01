import { Module } from "@nestjs/common";
import { PosteService } from "./poste.service";
import { PosteController } from "./poste.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PosteEntity } from "./poste.entity";
import { ApplyEntity } from "./apply.entity";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([PosteEntity, ApplyEntity]), CloudinaryModule],
  providers: [PosteService],
  controllers: [PosteController],
  exports: [PosteService]
})
export class PosteModule {
}

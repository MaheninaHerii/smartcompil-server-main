import { Module } from "@nestjs/common";
import { NousSommesService } from "./nous-sommes.service";
import { NousSommesController } from "./nous-sommes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NousSommesEntity } from "./nous-sommes.entity";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([NousSommesEntity]), CloudinaryModule],
  providers: [NousSommesService],
  controllers: [NousSommesController],
  exports: [NousSommesService]
})
export class NousSommesModule {
}

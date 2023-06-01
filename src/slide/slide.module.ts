import { Module } from "@nestjs/common";
import { SlideService } from "./slide.service";
import { SlideController } from "./slide.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SlideEntity } from "./slide.entity";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([SlideEntity]), CloudinaryModule],
  providers: [SlideService],
  controllers: [SlideController]
})
export class SlideModule {
}

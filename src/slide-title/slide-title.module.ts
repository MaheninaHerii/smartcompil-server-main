import { Module } from "@nestjs/common";
import { SlideTitleService } from "./slide-title.service";
import { SlideTitleController } from "./slide-title.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SlideTitleEntity } from "./slide-title.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SlideTitleEntity])],
  providers: [SlideTitleService],
  controllers: [SlideTitleController],
})
export class SlideTitleModule {
}

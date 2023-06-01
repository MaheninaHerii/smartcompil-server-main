import { Module } from "@nestjs/common";
import { ContactezNousService } from "./contactez-nous.service";
import { ContactezNousController } from "./contactez-nous.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactezNousEntity } from "./contactez-nous.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContactezNousEntity])],
  providers: [ContactezNousService],
  controllers: [ContactezNousController]
})
export class ContactezNousModule {
}

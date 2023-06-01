import { Module } from "@nestjs/common";
import { NosServicesEtProduitsService } from "./nos-services-et-produits.service";
import { NosServicesEtProduitsController } from "./nos-services-et-produits.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NosServicesEtProduitsEntity } from "./nos-services-et-produits.entity";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([NosServicesEtProduitsEntity]), CloudinaryModule],
  providers: [NosServicesEtProduitsService],
  controllers: [NosServicesEtProduitsController],
  exports: [NosServicesEtProduitsService]
})
export class NosServicesEtProduitsModule {
}

import { Module } from "@nestjs/common";
import { IntroductionNousRejoindreService } from "./introduction-nous-rejoindre.service";
import { IntroductionNousRejoindreController } from "./introduction-nous-rejoindre.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntroductionNousRejoindreEntity } from "./introduction-nous-rejoindre.entity";

@Module({
  imports: [TypeOrmModule.forFeature([IntroductionNousRejoindreEntity])],
  providers: [IntroductionNousRejoindreService],
  controllers: [IntroductionNousRejoindreController],
  exports: [IntroductionNousRejoindreService]
})
export class IntroductionNousRejoindreModule {
}

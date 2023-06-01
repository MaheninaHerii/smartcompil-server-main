import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { NousSommesModule } from "../nous-sommes/nous-sommes.module";
import { NosServicesEtProduitsModule } from "../nos-services-et-produits/nos-services-et-produits.module";
import { IntroductionNousRejoindreModule } from "../introduction-nous-rejoindre/introduction-nous-rejoindre.module";
import { PosteModule } from "../poste/poste.module";

@Module({
  imports: [NousSommesModule, NosServicesEtProduitsModule, IntroductionNousRejoindreModule, PosteModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {
}

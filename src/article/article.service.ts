import { Injectable } from "@nestjs/common";
import { IFullParagraph, IFullSection } from "./Article";
import { NousSommesService } from "../nous-sommes/nous-sommes.service";
import { NosServicesEtProduitsService } from "../nos-services-et-produits/nos-services-et-produits.service";
import { IntroductionNousRejoindreService } from "../introduction-nous-rejoindre/introduction-nous-rejoindre.service";
import { PosteService } from "../poste/poste.service";

@Injectable()
export class ArticleService {

  constructor(
    private readonly nousSommesService: NousSommesService,
    private readonly nosServicesEtProduitsService: NosServicesEtProduitsService,
    private readonly introductionNousRejoindreService: IntroductionNousRejoindreService,
    private readonly posteService: PosteService
  ) {
  }

  async getArticle(): Promise<IFullSection[]> {
    const articleList: IFullSection[] = [];
    const nousSommes = await this.nousSommesService.getToShowFrontOffice();
    articleList.push({
      sectionTitle: "A propos de nous",
      sectionId: "a-propos-de-nous",
      onWhite: false,
      decors: [{ type: "circle1", animateDelay: 300 }],
      paragraphs: [
        {
          reverse: false,
          title: nousSommes && nousSommes.title,
          image: (nousSommes && nousSommes.image) ? nousSommes.image : "",
          content: nousSommes && nousSommes.content
        }
      ]
    });

    const nosServicesEtProduits = await this.nosServicesEtProduitsService.getToShowFrontOffice();
    let index = 0;
    const paragraphList: IFullParagraph[] = [];
    nosServicesEtProduits && nosServicesEtProduits.map(value => {
      paragraphList.push({
        image: value.image
      });
      index++;
    });
    articleList.push({
      sectionTitle: "Nos partenaires",
      sectionId: "nos-partenaires",
      paragraphs: paragraphList
    });

    const introduction = await this.introductionNousRejoindreService.getToShowFrontOffice();
    const poste = await this.posteService.getToShowFrontOffice();

    articleList.push({
      sectionTitle: "Nous rejoindre",
      sectionId: "nous-rejoindre",
      onWhite: false,
      decors: [{ type: "circle4", animateDelay: 300 }],
      paragraphs: [
        {
          reverse: true,
          singleCol: true,
          content: introduction && introduction.content,
          poste
        }
      ]
    });

    return articleList;
  }
}

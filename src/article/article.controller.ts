import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";
import { IFullSection } from "./Article";

@ApiTags("Article")
@Controller("/api/v1/article")
export class ArticleController {

  constructor(private service: ArticleService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getArticle(): Promise<IFullSection[]> {
    return await this.service.getArticle();
  }
}

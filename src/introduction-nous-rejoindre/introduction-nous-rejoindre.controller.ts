import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IntroductionNousRejoindreService } from "./introduction-nous-rejoindre.service";
import { IntroductionNousRejoindreDTO } from "./introduction-nous-rejoindre.dto";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Nous rejoindre")
@Controller("/api/v1/introduction-nous-rejoindre")
export class IntroductionNousRejoindreController {
  constructor(private introductionNousRejoindreService: IntroductionNousRejoindreService) {
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllIntroductionNousRejoindre(): Promise<IntroductionNousRejoindreDTO[]> {
    return await this.introductionNousRejoindreService.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getIntroductionNousRejoindre(): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreService.getToShowFrontOffice();
  }

  @Get("/detail/:id")
  @HttpCode(HttpStatus.OK)
  async getIntroductionNousRejoindreDetail(@Param("id") id: number): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createIntroductionNousRejoindre(@Body() data: IntroductionNousRejoindreDTO): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreService.create(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("")
  @HttpCode(HttpStatus.OK)
  async updateIntroductionNousRejoindre(@Body() data: IntroductionNousRejoindreDTO): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreService.update(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateState")
  @HttpCode(HttpStatus.OK)
  async changeToPublishedIntroductionNousRejoindre(@Body() data: IntroductionNousRejoindreDTO): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreService.changeToPublished(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteIntroductionNousRejoindre(@Param("id") id: number): Promise<{ deleted: boolean }> {
    return await this.introductionNousRejoindreService.delete(id);
  }
}

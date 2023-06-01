import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Res,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { NosServicesEtProduitsService } from "./nos-services-et-produits.service";
import { NosServicesEtProduitsDTO } from "./nos-services-et-produits.dto";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Nos services et produits")
@Controller("/api/v1/nos-services-et-produits")
export class NosServicesEtProduitsController {
  constructor(private nosServicesEtProduitsService: NosServicesEtProduitsService) {
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllNosServicesEtProduits(): Promise<NosServicesEtProduitsDTO[]> {
    return await this.nosServicesEtProduitsService.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getNosServicesEtProduits(): Promise<NosServicesEtProduitsDTO[]> {
    return await this.nosServicesEtProduitsService.getToShowFrontOffice();
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateState")
  @HttpCode(HttpStatus.OK)
  async updateStateNosServicesEtProduits(@Body() data: NosServicesEtProduitsDTO): Promise<NosServicesEtProduitsDTO> {
    return await this.nosServicesEtProduitsService.updateStateNosServicesEtProduits(data);
  }

  @Get("/detail/:id")
  @HttpCode(HttpStatus.OK)
  async getNosServicesEtProduitsDetail(@Param("id") id: number): Promise<NosServicesEtProduitsDTO> {
    return await this.nosServicesEtProduitsService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  async createNosServicesEtProduits(@Body() data: NosServicesEtProduitsDTO,
                                    @UploadedFile() file: Express.Multer.File): Promise<NosServicesEtProduitsDTO> {
    return await this.nosServicesEtProduitsService.create(data, file);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deleteNosServicesEtProduits(@Param("id") id: number): Promise<{ deleted: boolean }> {
    return await this.nosServicesEtProduitsService.delete(id);
  }

  @Get("/image/:id")
  async seeUploadedFile(@Param("id") id: number, @Res() res) {
    const data = await this.nosServicesEtProduitsService.getById(id);
    return res.sendFile(data.image, { root: "./files/nos-services-et-produits" });
  }
}

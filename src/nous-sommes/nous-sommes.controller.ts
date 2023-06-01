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
import { NousSommesService } from "./nous-sommes.service";
import { NousSommesDTO } from "./nous-sommes.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Nous sommes")
@Controller("/api/v1/nous-sommes")
export class NousSommesController {
  constructor(private nousSommesService: NousSommesService) {
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllNousSommes(): Promise<NousSommesDTO[]> {
    return await this.nousSommesService.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getNousSommes(): Promise<NousSommesDTO> {
    return await this.nousSommesService.getToShowFrontOffice();
  }

  @Get("/detail/:id")
  @HttpCode(HttpStatus.OK)
  async getNousSommesDetail(@Param("id") id: number): Promise<NousSommesDTO> {
    return await this.nousSommesService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateState")
  @HttpCode(HttpStatus.OK)
  async updateStateNousSommes(@Body() data: NousSommesDTO): Promise<NousSommesDTO> {
    return await this.nousSommesService.updateStateNousSommes(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deleteNousSommes(@Param("id") id: number): Promise<NousSommesDTO> {
    return await this.nousSommesService.delete(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async createNousSommes(@Body() data: NousSommesDTO, @UploadedFile() file: Express.Multer.File): Promise<NousSommesDTO> {
    return await this.nousSommesService.create(data, file);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("")
  @UseInterceptors(FileInterceptor("file"))
  async updateNousSommes(@Body() data: NousSommesDTO, @UploadedFile() file: Express.Multer.File): Promise<NousSommesDTO> {
    return await this.nousSommesService.update(data, file);
  }

  @Get("/image/:id")
  async getImage(@Param("id") id: number, @Res() res) {
    const data = await this.nousSommesService.getById(id);
    return res.sendFile(data.image, { root: "./files/nous-sommes" });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Res, UploadedFiles, UseGuards, UseInterceptors
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PosteDTO } from "./poste.dto";
import { PosteService } from "./poste.service";
import { Roles, RolesGuard } from "../utils";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApplyDto } from "./apply.dto";

@ApiTags("Poste")
@Controller("/api/v1/poste")
export class PosteController {
  constructor(private posteService: PosteService) {
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllPoste(): Promise<PosteDTO[]> {
    return await this.posteService.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPoste(): Promise<PosteDTO[]> {
    return await this.posteService.getToShowFrontOffice();
  }

  @Get("/detail/:id")
  @HttpCode(HttpStatus.OK)
  async getPosteDetail(@Param("id") id: number): Promise<PosteDTO> {
    return await this.posteService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPoste(@Body() data: PosteDTO): Promise<PosteDTO> {
    return await this.posteService.create(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put()
  @HttpCode(HttpStatus.OK)
  async updatePoste(@Body() data: PosteDTO): Promise<PosteDTO> {
    return await this.posteService.update(data.id, data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/duplicate")
  @HttpCode(HttpStatus.OK)
  async duplicatePoste(@Body() posteDTO: PosteDTO): Promise<PosteDTO> {
    return await this.posteService.duplicatePoste(posteDTO);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateState")
  @HttpCode(HttpStatus.OK)
  async changeToPublishedPoste(@Body() data: PosteDTO): Promise<PosteDTO> {
    return await this.posteService.changeToPublished(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deletePoste(@Param("id") id: number): Promise<{ deleted: boolean }> {
    return await this.posteService.delete(id);
  }

  @Post("/apply")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "cv", maxCount: 1 },
    { name: "lm", maxCount: 1 }
  ]))
  async apply(@Body() data: ApplyDto, @UploadedFiles() files: {
                cv?: Express.Multer.File[], lm?: Express.Multer.File[]
              }
  ): Promise<ApplyDto> {
    return await this.posteService.apply(data, files.cv, files.lm);
  }

  @Get("/apply/document/:image")
  async getImage(@Param("image") image: string, @Res() res) {
    return res.sendFile(image, { root: "./files/cv" });
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/apply/all")
  @HttpCode(HttpStatus.OK)
  getAllApply(): Promise<ApplyDto[]> {
    return this.posteService.getAllApply();
  }
}

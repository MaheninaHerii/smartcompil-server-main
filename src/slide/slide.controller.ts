import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { SlideDTO } from "./slide.dto";
import { SlideService } from "./slide.service";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Slide")
@Controller("/api/v1/slide")
export class SlideController {
  constructor(private slideService: SlideService) {
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllSlide(): Promise<SlideDTO[]> {
    return await this.slideService.getAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSlide(): Promise<SlideDTO[]> {
    return await this.slideService.getToShowFrontOffice();
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put("/updateState")
  @HttpCode(HttpStatus.OK)
  async changeToPublishedSlide(@Body() data: SlideDTO): Promise<SlideDTO> {
    return await this.slideService.changeToPublished(data);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async deleteSlide(@Param("id") id: number): Promise<{ deleted: boolean }> {
    return await this.slideService.delete(id);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post("")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  async createSlide(@UploadedFile() file: Express.Multer.File): Promise<SlideDTO> {
    if (file)
      return await this.slideService.create(file);
    return null;
  }


  @Get("/image/:id")
  async seeUploadedFile(@Param("id") id: number, @Res() res) {
    const data = await this.slideService.getById(id);
    return res.sendFile(data.image, { root: "./files/slide" });
  }
}

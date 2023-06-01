import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put, UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SlideTitleService } from "./slide-title.service";
import { SlideTitleDTO } from "./slide-title.dto";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Titre Slide")
@Controller("/api/v1/slide-title")
export class SlideTitleController {
  constructor(private slideTitleService: SlideTitleService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSlideTitle(): Promise<SlideTitleDTO> {
    return await this.slideTitleService.getSlideTitle();
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateSlideTitle(@Body() data: SlideTitleDTO): Promise<SlideTitleDTO> {
    return await this.slideTitleService.saveOrUpdate(data);
  }
}

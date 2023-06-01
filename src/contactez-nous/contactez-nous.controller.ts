import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put, UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ContactezNousDTO } from "./contactez-nous.dto";
import { ContactezNousService } from "./contactez-nous.service";
import { Roles, RolesGuard } from "../utils";

@ApiTags("Contactez nous")
@Controller("/api/v1/contactez-nous")
export class ContactezNousController {
  constructor(private contactezNousService: ContactezNousService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getContactezNous(): Promise<ContactezNousDTO> {
    return await this.contactezNousService.getContact();
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateContactezNous(@Body() data: ContactezNousDTO): Promise<ContactezNousDTO> {
    return await this.contactezNousService.saveOrUpdate(data);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlideDTO } from "./slide.dto";
import { SlideEntity } from "./slide.entity";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class SlideService {
  constructor(
    @InjectRepository(SlideEntity)
    private slideRepository: Repository<SlideEntity>,
    private cloudinary: CloudinaryService
  ) {
  }

  async getAll(): Promise<SlideDTO[]> {
    return await this.slideRepository.find();
  }

  async getToShowFrontOffice(): Promise<SlideDTO[]> {
    return await this.slideRepository.find({ where: { published: true } });
  }

  async getById(id: number): Promise<SlideDTO> {
    return await this.slideRepository.findOne({ where: { id } });
  }

  async create(file: Express.Multer.File): Promise<SlideDTO> {
    const countSlide = await this.slideRepository.count();
    const data = new SlideDTO();
    data.published = countSlide === 0;
    if (file) {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      data.image = secure_url;
    }
    console.log("image uploaded ==> " + data.image);
    return await this.slideRepository.save(data);
  }

  async changeToPublished(data: SlideDTO): Promise<SlideDTO> {
    data.published = !data.published;
    await this.slideRepository.update({ id: data.id }, { published: data.published });
    return data;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const slide = await this.slideRepository.findOne({ where: { id, published: false } });
    if (slide) {
      await this.slideRepository.delete({ id });
      return { deleted: true };
    }
    return { deleted: false };
  }
}

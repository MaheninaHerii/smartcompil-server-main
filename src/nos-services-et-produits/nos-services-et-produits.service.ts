import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NosServicesEtProduitsEntity } from "./nos-services-et-produits.entity";
import { NosServicesEtProduitsDTO } from "./nos-services-et-produits.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class NosServicesEtProduitsService {
  constructor(
    @InjectRepository(NosServicesEtProduitsEntity)
    private nosServicesEtProduitsRepository: Repository<NosServicesEtProduitsEntity>,
    private cloudinary: CloudinaryService
  ) {
  }

  async getAll(): Promise<NosServicesEtProduitsDTO[]> {
    return await this.nosServicesEtProduitsRepository.find();
  }

  async getToShowFrontOffice(): Promise<NosServicesEtProduitsDTO[]> {
    return await this.nosServicesEtProduitsRepository.find({ where: { published: true } });
  }

  async getById(id: number): Promise<NosServicesEtProduitsDTO> {
    return await this.nosServicesEtProduitsRepository.findOne({ where: { id } });
  }

  async create(data: NosServicesEtProduitsDTO, file: Express.Multer.File): Promise<NosServicesEtProduitsDTO> {
    if (file) {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      data.image = secure_url;
    }
    data.published = false;
    console.log("image uploaded ==> " + data.image);
    return await this.nosServicesEtProduitsRepository.save(data);
  }

  async updateStateNosServicesEtProduits(data: NosServicesEtProduitsDTO): Promise<NosServicesEtProduitsDTO> {
    data.published = !data.published;
    await this.nosServicesEtProduitsRepository.update(
      { id: data.id }, { published: data.published }
    );
    return data;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const nosServicesEtProduits = await this.nosServicesEtProduitsRepository.findOne({
      where: {
        id,
        published: false
      }
    });
    if (nosServicesEtProduits) {
      await this.nosServicesEtProduitsRepository.delete({ id });
      return { deleted: true };
    }
    return { deleted: false };
  }
}

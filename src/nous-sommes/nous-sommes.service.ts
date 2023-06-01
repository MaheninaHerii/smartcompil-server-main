import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { NousSommesEntity } from "./nous-sommes.entity";
import { NousSommesDTO } from "./nous-sommes.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class NousSommesService {
  constructor(
    @InjectRepository(NousSommesEntity)
    private nousSommesRepository: Repository<NousSommesEntity>,
    private cloudinary: CloudinaryService
  ) {
  }

  async getAll(): Promise<NousSommesDTO[]> {
    return await this.nousSommesRepository.find();
  }

  async getToShowFrontOffice(): Promise<NousSommesDTO> {
    return await this.nousSommesRepository.findOne({ where: { published: true } });
  }

  async getById(id: number): Promise<NousSommesDTO> {
    return await this.nousSommesRepository.findOne({ where: { id } });
  }

  async create(data: NousSommesDTO, file: Express.Multer.File): Promise<NousSommesDTO> {
    const countNousSommes = await this.nousSommesRepository.count();
    data.published = countNousSommes === 0;
    if (file) {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      data.image = secure_url;
    }
    console.log("image uploaded ==> " + data.image);
    if (!!data.content && !!data.title)
      return await this.nousSommesRepository.save(data);
    return data;
  }

  async update(data: Partial<NousSommesDTO>, file: Express.Multer.File): Promise<NousSommesDTO> {
    const { id, title, content } = data;
    if (file) {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      data.image = secure_url;
    }
    console.log("image uploaded ==> " + data.image);
    if (!!content && !!title && !!data.image)
      await this.nousSommesRepository.update({ id }, { title, content, image: data.image });
    else if (!!content && !!title) {
      await this.nousSommesRepository.update({ id }, { title, content });
    }
    return await this.nousSommesRepository.findOne({ where: { id } });
  }

  async updateStateNousSommes(data: NousSommesDTO): Promise<NousSommesDTO> {
    data.published = !data.published;
    await this.nousSommesRepository.update({ id: data.id }, { published: data.published });
    if (data.published)
      await this.nousSommesRepository.update({ id: Not(data.id) }, { published: false });
    return data;
  }

  async delete(id: number): Promise<NousSommesDTO> {
    const nousSommes = await this.nousSommesRepository.findOne({ where: { id, published: false } });
    if (nousSommes) {
      await this.nousSommesRepository.delete({ id });
    }
    return nousSommes;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PosteDTO } from "./poste.dto";
import { PosteEntity } from "./poste.entity";
import { ApplyEntity } from "./apply.entity";
import { ApplyDto } from "./apply.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class PosteService {
  constructor(
    @InjectRepository(PosteEntity)
    private posteRepository: Repository<PosteEntity>,
    @InjectRepository(ApplyEntity)
    private applyRepository: Repository<ApplyEntity>,
    private cloudinary: CloudinaryService
  ) {
  }

  async getAll(): Promise<PosteDTO[]> {
    return await this.posteRepository.find();
  }

  async getAllApply(): Promise<ApplyDto[]> {
    let data = await this.applyRepository.find();
    const applyList: ApplyDto[] = [];
    if (data && data.length) {
      for (const value of data) {
        const poste = await this.getById(value.posteId);
        value.posteName = poste && poste.title;
        applyList.push(value);
      }
    }
    return applyList;
  }

  async getToShowFrontOffice(): Promise<PosteDTO[]> {
    return await this.posteRepository.find({ where: { published: true } });
  }

  async getById(id: number): Promise<PosteDTO> {
    return await this.posteRepository.findOne({ where: { id } });
  }

  async create(data: PosteDTO): Promise<PosteDTO> {
    const countPoste = await this.posteRepository.count();
    data.published = countPoste === 0;
    return await this.posteRepository.save(data);
  }

  async apply(data: ApplyDto, cv?: Express.Multer.File[], lm?: Express.Multer.File[]): Promise<ApplyDto> {
    data.applyAt = new Date();
    if (lm && lm.length) {
      const { secure_url } = await this.cloudinary.uploadImage(lm[0]);
      data.lm = secure_url;
    }
    if (cv && cv.length) {
      const { secure_url } = await this.cloudinary.uploadImage(cv[0]);
      data.cv = secure_url;
      return await this.applyRepository.save(data);
    }
    return data;
  }

  async update(id: number, data: PosteDTO): Promise<PosteDTO> {
    await this.posteRepository.update({ id }, { ...data });
    return data;
  }

  async duplicatePoste(posteDTO: PosteDTO): Promise<PosteDTO> {
    const { id, ...data } = posteDTO;
    data.published = false;
    return await this.posteRepository.save(data);
  }

  async changeToPublished(data: PosteDTO): Promise<PosteDTO> {
    data.published = !data.published;
    await this.posteRepository.update({ id: data.id }, { published: data.published });
    return data;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const poste = await this.posteRepository.findOne({ where: { id, published: false } });
    if (poste) {
      await this.posteRepository.delete({ id });
      return { deleted: true };
    }
    return { deleted: false };
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { IntroductionNousRejoindreDTO } from "./introduction-nous-rejoindre.dto";
import { IntroductionNousRejoindreEntity } from "./introduction-nous-rejoindre.entity";

@Injectable()
export class IntroductionNousRejoindreService {
  constructor(
    @InjectRepository(IntroductionNousRejoindreEntity)
    private introductionNousRejoindreRepository: Repository<IntroductionNousRejoindreEntity>
  ) {
  }

  async getAll(): Promise<IntroductionNousRejoindreDTO[]> {
    return await this.introductionNousRejoindreRepository.find();
  }

  async getToShowFrontOffice(): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreRepository.findOne({ where: { published: true } });
  }

  async getById(id: number): Promise<IntroductionNousRejoindreDTO> {
    return await this.introductionNousRejoindreRepository.findOne({ where: { id } });
  }

  async create(data: IntroductionNousRejoindreDTO): Promise<IntroductionNousRejoindreDTO> {
    const countIntroductionNousRejoindre = await this.introductionNousRejoindreRepository.count();
    data.published = countIntroductionNousRejoindre === 0;
    if (!!data.content)
      return await this.introductionNousRejoindreRepository.save(data);
    return data;
  }

  async update(data: Partial<IntroductionNousRejoindreDTO>): Promise<IntroductionNousRejoindreDTO> {
    const { content } = data;
    await this.introductionNousRejoindreRepository.update({ id: data.id }, { content });
    return await this.introductionNousRejoindreRepository.findOne({ where: { id: data.id } });
  }

  async changeToPublished(data): Promise<IntroductionNousRejoindreDTO> {
    data.published = !data.published;
    await this.introductionNousRejoindreRepository.update({ id: data.id }, { published: data.published });
    if (data.published)
      await this.introductionNousRejoindreRepository.update({ id: Not(data.id) }, { published: false });
    return data;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const introductionNousRejoindre = await this.introductionNousRejoindreRepository.findOne({
      where: {
        id,
        published: false
      }
    });
    if (introductionNousRejoindre) {
      await this.introductionNousRejoindreRepository.delete({ id });
      return { deleted: true };
    }
    return { deleted: false };
  }
}

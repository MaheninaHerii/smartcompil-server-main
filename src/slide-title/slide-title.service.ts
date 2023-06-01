import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlideTitleDTO } from "./slide-title.dto";
import { SlideTitleEntity } from "./slide-title.entity";

@Injectable()
export class SlideTitleService {
  constructor(
    @InjectRepository(SlideTitleEntity)
    private slideTitleRepository: Repository<SlideTitleEntity>
  ) {
  }

  async getSlideTitle(): Promise<SlideTitleDTO> {
    const slideTitles = await this.slideTitleRepository.find();
    return slideTitles && slideTitles.length ? slideTitles[0] : null;
  }

  async saveOrUpdate(data: Partial<SlideTitleDTO>): Promise<SlideTitleDTO> {
    let slideTitle = await this.getSlideTitle();
    if (slideTitle && slideTitle.id > 0) {
      await this.slideTitleRepository.update({ id: slideTitle.id }, { ...data });
    } else {
      slideTitle = await this.slideTitleRepository.create(data);
      await this.slideTitleRepository.save(data);
    }
    return slideTitle;
  }

}

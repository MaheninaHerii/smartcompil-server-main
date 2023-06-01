import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactezNousDTO } from "./contactez-nous.dto";
import { ContactezNousEntity } from "./contactez-nous.entity";

@Injectable()
export class ContactezNousService {
  constructor(
    @InjectRepository(ContactezNousEntity)
    private contactezNousRepository: Repository<ContactezNousEntity>
  ) {
  }

  async getContact(): Promise<ContactezNousDTO> {
    const contacts = await this.contactezNousRepository.find();
    return contacts && contacts.length ? contacts[0] : null;
  }

  async saveOrUpdate(data: Partial<ContactezNousDTO>): Promise<ContactezNousDTO> {
    let contact = await this.getContact();
    if (contact && contact.id > 0) {
      await this.contactezNousRepository.update({ id: contact.id }, { ...data });
    } else {
      contact = await this.contactezNousRepository.create(data);
      await this.contactezNousRepository.save(data);
    }
    return contact;
  }

}

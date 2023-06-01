import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contactez-nous")
export class ContactezNousEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  facebook: string;

  @Column()
  linkedin: string;
}
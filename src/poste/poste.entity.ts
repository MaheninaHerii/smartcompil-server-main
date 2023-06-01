import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("poste")
export class PosteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  profile: string;

  @Column()
  remuneration: string;

  @Column()
  contact: string;

  @Column()
  published: boolean;
}
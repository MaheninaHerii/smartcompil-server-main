import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nous_sommes")
export class NousSommesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image: string;

  @Column()
  published: boolean;
}
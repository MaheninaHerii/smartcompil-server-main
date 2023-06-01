import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("slide")
export class SlideEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  published: boolean;
}
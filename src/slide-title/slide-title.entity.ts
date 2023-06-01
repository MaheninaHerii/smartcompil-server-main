import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("slide-title")
export class SlideTitleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("apply")
export class ApplyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  posteId: number;

  @Column()
  cv: string;

  @Column()
  lm: string;

  @Column()
  message: string;

  @Column()
  posteName: string;

  @Column()
  applyAt: Date;
}
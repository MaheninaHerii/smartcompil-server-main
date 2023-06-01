import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("introduction-nous-rejoindre")
export class IntroductionNousRejoindreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  published: boolean;

  @Column()
  deleted: boolean;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nos-services-et-produits")
export class NosServicesEtProduitsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  published: boolean;
}
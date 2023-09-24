import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Element } from "./Element";

@Entity("midias")
export class Midia {
  @PrimaryGeneratedColumn("uuid")
  midiaProfileId?: string;

  @Column({ nullable: true })
  width?: string;

  @Column({ nullable: true })
  height?: string;

  @Column({ nullable: true })
  thick?: string;

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  @OneToOne(() => Element, (element) => element.midia)
  element: Element;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

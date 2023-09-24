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

@Entity("stuffs")
export class Stuff {
  @PrimaryGeneratedColumn("uuid")
  stuffProfileId?: string;

  @Column({ nullable: true })
  stuffPacking?: string;

  @Column({ nullable: true })
  stuffPerPacking?: string;

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  @OneToOne(() => Element, (element) => element.stuff)
  element: Element;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

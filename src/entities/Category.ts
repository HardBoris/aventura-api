import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
// import { Stuff } from "./Stuff";
// import { Midia } from "./Midia";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  categoryId?: string;

  @Column()
  category: string;

  /* @OneToMany(() => Stuff, (stuff) => stuff.category)
  stuffs: Stuff[]; */

  /* @OneToMany(() => Midia, (midia) => midia.category)
  midias: Midia[]; */

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

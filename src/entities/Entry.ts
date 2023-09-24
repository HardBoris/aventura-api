import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movement } from "./Movement";
import { Company } from "./Company";
import { Purchase } from "./Purchase";
import { User } from "./User";

@Entity("entries")
export class Entry {
  @PrimaryGeneratedColumn()
  entryId: number;

  @Column({ default: false })
  isReceived: boolean;

  @Column()
  entryDate: Date;

  @ManyToOne(() => User, (user) => user.entries)
  @JoinColumn({ name: "userId" })
  responsivel: User;

  @OneToOne(() => Purchase)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @OneToMany(() => Movement, (movement) => movement.entry, {
    cascade: true,
  })
  movements: Movement[];

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

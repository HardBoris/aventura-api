import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movement } from "./Movement";

@Entity("entries")
export class Entry {
  @PrimaryGeneratedColumn()
  entryId: number;

  @Column({ default: false })
  isReceived: boolean;

  @Column()
  entryDate: Date;

  @Column()
  seller: string;

  @Column()
  invoice: string;

  @OneToMany(() => Movement, (movement) => movement.entry, {
    cascade: true,
    // eager: true,
  })
  movements: Movement[];
}

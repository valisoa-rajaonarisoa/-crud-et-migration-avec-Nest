import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;

  @ManyToMany(() => Item)
  items: Item[];
  
  constructor(tag: Partial<Tag>) {
    Object.assign(this, tag);
  }
}

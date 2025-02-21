import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  constructor(comment: Partial<Comment>) {
    Object.assign(this, comment);
  }
}

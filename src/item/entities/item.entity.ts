import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  // *********RELATION ONE TO ONE LISTING
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  //   *********RELATION OneToMany  COMMENTS**
  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];



  // ********************* RELATION WITH TAGS ***
  @ManyToMany(()=>Tag,{cascade:true})
  @JoinTable()
  tags:Tag[]

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}

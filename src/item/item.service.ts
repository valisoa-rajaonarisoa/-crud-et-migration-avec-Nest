import { Injectable, NotFoundException } from '@nestjs/common';

import { Item } from './entities/item.entity';
import { EntityManager, Repository, UpdateDateColumn } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/item/create-item.dto';
import { UpdateItemDto } from './dto/item/update-item.dto';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { CreateTagDto } from './dto/tag/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemService {
  // *****************constructor entitymanager *****
  constructor(
    @InjectRepository(Item) //injecter le Repostory du typorm
    private readonly itemsRepository: Repository<Item>, //creation d'un attribu repository pour recupere au data bdd

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    private readonly entitymanager: EntityManager,
  ) {}

  // *******************ADD ITEM WITH Listing**
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing, //je copie tout les object createItem.listing,
      rating: 0,
    });

    let tags:Tag[]=[];
    if(createItemDto.tags.length!==0 && createItemDto.tags){
    createItemDto.tags.map((create)=>(
      tags.push(new Tag(create))
    ))
    }
    
    const {name}=createItemDto
    const isPublic=createItemDto.public

    const item = new Item({name,public:isPublic,listing,tags})

    // *****2 save avec entitymanager**
    await this.entitymanager.save(item);

    return item;
  }

  async findAll() {
    return await this.itemsRepository.find();
  }

  // ************* R E C U P E R E R UN ITEM AVEC LISTING AND COMMENTS ***
  async findOne(id: number) {
    return await this.itemsRepository.findOne({
      where: { id: id },
      relations: { listing: true, comments: true },
    });
  }

  // *********************U P D A T E WITH COMMENT ***********
  async update(id: number, updateItemDto: UpdateItemDto) {
    // ****on cherche s'il existe **
    const item = await this.itemsRepository.findOne({
      where: { id: id },
      relations: { listing: true, comments: true },
    });

    // ***error si il n'existe pas **
    if (!item) throw new NotFoundException({ message: 'item non trouvé' });

    item.public = updateItemDto.public;

    updateItemDto.comments.map((CreateCommentDto) =>
      item.comments.push(new Comment(CreateCommentDto)),
    );

    // item.comments.push=
    await this.entitymanager.save(item);
  }

  // ******** D E L E T E *********************
  async remove(id: number) {
    // ****on cherche s'il existe **
    const item = await this.itemsRepository.findOne({ where: { id: id } });

    // ***error si il n'existe pas **
    if (!item) throw new NotFoundException({ message: 'item non trouvé' });

    // ****supprimer**
    return await this.itemsRepository.remove(item);
  }
}

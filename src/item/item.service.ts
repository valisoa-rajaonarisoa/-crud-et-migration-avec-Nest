import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class ItemService {
  // *****************constructor entitymanager *****
  constructor(
    @InjectRepository(Item) //injecter le Repostory du typorm
    private readonly itemsRepository: Repository<Item>, //creation d'un attribu repository pour recupere au data bdd

    private readonly entitymanager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    // **********1 creer un objet apartir de l'entity item et lui passe le dto
    const item = new Item(createItemDto);

    // *****2 save avec entitymanager**
    await this.entitymanager.save(item);

    return item;
  }

  async findAll() {
    return await this.itemsRepository.find();
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOne({where : {id:id}})
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // ****on cherche s'il existe **
    const item=await this.itemsRepository.findOne({where : {id:id}})

    // ***error si il n'existe pas **
    if(!item) throw new NotFoundException({message:"item non trouvé"})
    
    // **** update  le upadateDto est un object donc on peut **
    item.name= updateItemDto.name
    item.public=updateItemDto.public

    // ***************save *************
    return await this.itemsRepository.save(item)
  }

  async remove(id: number) {
    // ****on cherche s'il existe **
    const item=await this.itemsRepository.findOne({where : {id:id}})

    // ***error si il n'existe pas **
    if(!item) throw new NotFoundException({message:"item non trouvé"})
    
    // ****supprimer**
    return await this.itemsRepository.remove(item)
  }
}

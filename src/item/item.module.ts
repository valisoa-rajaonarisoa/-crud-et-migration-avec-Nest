import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Item])], //j'appelle ici le entity Item pour qu'on puisse l'avoir un table
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}

import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './providers/tags.service';

@Module({
  controllers: [TagsController],
  imports:[TypeOrmModule.forFeature([tag])],
  providers: [TagsService],
  exports:[TagsService]
})
export class TagsModule {}

import { Module, Post } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-options.entity';
import { MetaOptionsService } from './providers/meta_options.service';

@Module({
  controllers: [MetaOptionsController],
  imports:[TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService]

})
export class MetaOptionsModule {}

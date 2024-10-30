import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta_options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaoptions.dto';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(
        /**
         * Inject MetaOptionsService
         * */
        private readonly MetaOptionsService: MetaOptionsService,
      ) {}
    
      @Post()
      public async create(
        @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
      ) {
        return this.MetaOptionsService.create(createPostMetaOptionsDto);
      }
}

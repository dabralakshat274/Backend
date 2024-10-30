import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-metaoptions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-options.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {

constructor(
    /**
     * Inject metaOptionrespository
     */
@InjectRepository(MetaOption)
    private readonly metaOptionsrepository:Repository <MetaOption>
){}

        public async create(createPostMetaOptionsDto:CreatePostMetaOptionsDto){
            let metaOption=this.metaOptionsrepository.create(createPostMetaOptionsDto)
            return await this.metaOptionsrepository.save(metaOption)
        }
    
}

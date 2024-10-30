import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        /**
         * Inject tagsRepository
         */
        @InjectRepository(tag)
        private readonly tagsRepository:Repository<tag>
    ){}
    public async create(createTagDto:CreateTagDto){
        
        let tag= this.tagsRepository.create(createTagDto);
        return await this.tagsRepository.save(tag);
    }

    public async findMultipleTags(tags:number[]){

        let results=await this.tagsRepository.find({
            where:{
                id:In(tags)     //In function takes in an array of id's and finds all the tags that have id in this array 
            }
        })
        return results;
    }

    public async delete (id:number)
    {
        await this.tagsRepository.delete(id);
        return{
            deleted:true,
            id
        };
    }

    public async softRemove(id:number){
        await this.tagsRepository.softDelete(id);
        return{
            deleted:true,
            id
        };
    }
}

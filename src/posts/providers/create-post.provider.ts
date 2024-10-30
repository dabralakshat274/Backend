import { BadGatewayException, BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreatePostProvider {
    constructor(
        /**
         * Injecting UsersService
         */
        private readonly usersService:UsersService,

        /**
         * Injecting TagsService
         */
        private readonly tagsService:TagsService,

        /**
         * Inject Repository
         */
        @InjectRepository(Post)
        private readonly postsRepository:Repository<Post>,

    ){}
    public async create( createPostDto: CreatePostDto,user : ActiveUserData) {
    
        let author =undefined;
        let tags=undefined;

        try{
        //FIND AUTHOR  from database
        author = await this.usersService.findOneById(user.sub);
    
        //Find Tags
        tags = await this.tagsService.findMultipleTags(createPostDto.tags);

            }catch(error){
                throw new ConflictException();
            }

            if(author){
                throw new BadRequestException();
            }
            if(createPostDto.tags.length != tags.length){
                throw new BadRequestException("Please check your Tag id's")
            }
        //Create posts
        let post = this.postsRepository.create({
          ...createPostDto,
          author: author,
          tags: tags,
        });
    
        try{
        //return the post
        return await this.postsRepository.save(post);
    }catch(error){
        throw new ConflictException(error,{
            description: 'Ensure Post slug is unique and not duplicate'})
    }
      }
    
}

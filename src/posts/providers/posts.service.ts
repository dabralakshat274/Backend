import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { UsersService } from 'src/users/providers/users.service';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { tag } from 'src/tags/tag.entity';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostDto } from '../dtos/get-posts.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting UsersService
     */
    private readonly usersService: UsersService,

    /**
     * Injecting PostsRespository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting MetaOptions repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Injecting tags Service
     */
    private readonly tagsService: TagsService,


    /**
     * Injecting pagination provider
     */
    private readonly paginationProvider:PaginationProvider,

    /**
     * Inject createPostProvider
     */
    private readonly createPostProivder:CreatePostProvider,
  ) {}

  
  public async create(createPostDto: CreatePostDto, user:ActiveUserData) {
    //return the post
    return await this.createPostProivder.create(createPostDto,user);
  }


  /**
   * Creating new posts
   */
  /*
  public async create(@Body() createPostDto: CreatePostDto) {
    // {     getting rid of this code as cascade is used now

    //     //Create Metaoptions
    //     let metaOptions= createPostDto.metaoptions? this.metaOptionsRepository.create(createPostDto.metaoptions):null;
    //       if(metaOptions){
    //         await this.metaOptionsRepository.save(metaOptions);
    //       }

    //

    //     //Add metaoptions to the post
    //     if(metaOptions){
    //       post.metaoptions=metaOptions;
    //     }
    //   }

    //FIND AUTHOR  from database
    let author = await this.usersService.findOneById(createPostDto.authorId);

    //Find Tags
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    //Create posts
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    //return the post
    return await this.postsRepository.save(post);
  }
  */

  //public async findAll(userId: string) {
  public async findAll(postQuery:GetPostDto ,userId: string):Promise<Paginated<Post>> {
    //const user = this.usersService.findOneById(userId);

    //let posts = await this.postsRepository.find({      //using pagination provider so removed it

      //: {
        //we are telling the relationship, other wise metaoptions will not be fetched in posts/GET request
        //metaoptions: true, // other option is using eager:true in post.entity
        //author:true,        //removing bec. of eager loading
        // tags:true,         //removing bec. of eager loading
      //},

      //using pagination provider so removed it
      //skip:(postQuery.page-1)* postQuery.limit,        // skips the element eg 2 page skip first 10 and show 11-20
      //take:postQuery.limit,                            // take as to show element in page 

      let posts = await this.paginationProvider.paginateQuery({
        limit:postQuery.limit,
        page:postQuery.page,}, this.postsRepository,);
    return posts;

    // return [
    //   {
    //     user: user,
    //     title: 'Test Tile',
    //     content: 'Test Content',
    //   },
    //   {
    //     user: user,
    //     title: 'Test Tile 2',
    //     content: 'Test Content 2',
    //   },
    // ];
  }
  public async delete(id: number) {
    //find the post to which user has send the id
    // let post=await this.postsRepository.findOneBy({id:id})

    //deleting the post

    await this.postsRepository.delete(id);

    //delete the meta-option
    //await this.metaOptionsRepository.delete(post.metaoptions.id)

    // let inversePost= await this.metaOptionsRepository.find({
    //   where:{id:post.metaoptions.id},
    //   relations:{
    //     post:true,
    //   }
    // })

    //console.log(inversePost)

    //confirmation
    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    //Find the Tags
    let tags=undefined;

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'ERROR CONNECTING TO THE DATABASE',
        },
      );
    }
    if (!tags|| tags.length !== patchPostDto.tags.length) {    // if tags not found and if requested tags not equal to retrieve tags
      throw new BadRequestException(`Please check your tag ID's and ensure they are correct`);
    }

    //let tags= await this.tagsService.findMultipleTags(patchPostDto.tags)

    let post=undefined;
    //Find the repost
    try {
       post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'ERROR CONNECTING TO THE DATABASE',
        },
      );
    }

    //let post= await this.postsRepository.findOneBy({
    //  id:patchPostDto.id,
    //});

    if (!post) {
      throw new BadRequestException('The post ID does not exists');
      //throw new NotFoundException(`Post with ID ${patchPostDto.id} not found`);
    }

    //Update the properties of the post
    post.title = patchPostDto.title ?? post.title; //Nullish coalescing operator in javascript, returns its right-hand side operand when its left-hand side operand is null or undefined
    // if patch.PostDto.title exists then it'll be send to post.title but if it is null then post.title will sent to post.title (remain same)
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageURL =
      patchPostDto.featuredImageURL ?? post.featuredImageURL;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    //Assign new tags to the post
    post.tags = tags;

    //Save the post and return
    try{
      await this.postsRepository.save(post);
    }
    catch(error)
    {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'ERROR CONNECTING TO THE DATABASE',
        },
      );
    }
    return post;
    //return await this.postsRepository.save(post);
  }
}

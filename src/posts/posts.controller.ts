import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user-.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('test')

@ApiTags('Posts')
export class TestController {
  //Injecting Posts service
  constructor(private readonly testService: PostsService) {}
}


@Controller('posts')
export class PostsController {
  constructor(private readonly postsservice:PostsService){}
 

  //GET localhost:3000/posts/:userId
@Get('/:userId?')
public getPosts(@Param('userId') userId:string, @Query() postQuery:GetPostDto){
  //console.log(postQuery);
  return this.postsservice.findAll(postQuery,userId)
}

@ApiOperation({
  summary: 'Creates a new blog post',
})
@ApiResponse({
  status: 201,
  description: 'You get a 201 response if your post is created successfully',
})
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto, @ActiveUser() user: ActiveUserData) {
    //console.log(user);
    console.log(createPostDto);
    return this.postsservice.create(createPostDto,user)


// public createUsers(@Body() request: CreateUserDto) //calling Dto file
//   {
//     //console.log(request instanceof CreateUserDto);
//     return this.usersService.createUser(request);
//     //return 'You sent a post requet to users endpoint';
//   }


  }

  @ApiOperation({
    summary:"This API endpoint updates the existing blog post"
  })
  @ApiResponse({
    status:200,
    description:"You get a 200 response if your post is updated successfully"
  })
  @Patch()
  public updatePost(@Body() patchPostDto:PatchPostDto){
    //console.log(patchPostDto);
    return this.postsservice.update(patchPostDto);
  }
  @Delete()
  public deletePose(@Query('id',ParseIntPipe) id:number){
    //trigger the delete method
    return this.postsservice.delete(id);
  }
}

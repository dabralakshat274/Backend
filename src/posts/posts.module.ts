import { Module } from '@nestjs/common';
import { PostsController, TestController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { usersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/providers/users.service';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  controllers: [TestController,PostsController],
  providers: [PostsService, CreatePostProvider],
  imports:[TypeOrmModule.forFeature([Post,MetaOption]),usersModule,TagsModule,PaginationModule]

})
export class TestModule {}

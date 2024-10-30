import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {


    constructor(
        /**
         * Inject TagsService
         */
        private readonly tagService:TagsService,
    ){}


    @Post()
    public create(@Body() createtagDto:CreateTagDto){
        return this.tagService.create(createtagDto)

    }
    @Delete()
    public async delete (@Query('id',ParseIntPipe) id:number){
        return this.tagService.delete(id);
    }

    //   /tags/soft-delete
    @Delete('soft-delete')
    public async softdelete (@Query('id',ParseIntPipe) id:number){
        return this.tagService.softRemove(id);

    }
}

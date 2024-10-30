import { Controller, Get,Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    @Get('/:id/:optional?')
    public getUser(@Param('id') id: any,@Query('limit') limit: any){
        console.log(id);
        console.log(limit);
        return 'YOU HAVE SEND A REQUEST TO USER ENDPOINT';
    }
}

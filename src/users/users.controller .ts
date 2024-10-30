import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Headers,
  Ip,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ParseBoolPipe,
  ValidationPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Authtype } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
constructor(//Injecting user service
  private readonly usersService:UsersService){}

  @Get('/:id?') 
  @ApiOperation({
    summary :'Fetches a list of registered users on the application'
  })
  @ApiResponse({
    status:200,
    description:'Users fetch successfully based on the query',
  })
@ApiQuery({
  name:'limit',
  type:'number',
  required:false,
  description:'The number of entries returned per query',
  example:10.

  
})
@ApiQuery({
  name:'page',
  type:'number',
  required:false,
  description:'The position of the page number that you want the API to return',
  example:1.  
})
  public getUsers(
    @Param() getUserParam:GetUsersParamDto ,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,) 
    {
  
      return this.usersService.findAll(getUserParam,limit,page);
    // console.log(typeof id);
    // console.log(id);
    // console.log(limit);
    // console.log(page);
    // console.log(typeof limit);
    // console.log(typeof page);
    // return 'YOU HAVE SEND A REQUEST TO USER ENDPOINT';
  }
  /*@Post()
    public createUsers(@Body('email') email:string,@Body('lastname') lastname:any, @Headers() headers:any, @Ip() ip:any){
        console.log(email);
        console.log(lastname);
        console.log(headers);
        console.log(ip);

        return 'You sent a post requet to users endpoint'
    }*/
  @Post()
  //@SetMetadata('authtype','None')   //means auth type is none  bascialy creating this route to be public
  @Auth(Authtype.None)
  public createUsers(@Body() request: CreateUserDto) //calling Dto file
  {
    //console.log(request instanceof CreateUserDto);

    return this.usersService.createUser(request);


    //return 'You sent a post requet to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto:PatchUserDto )
  {
return patchUserDto;
  }


  //@UseGuards(AccessTokenGuard)
  @Post('create-many')
  //public createManyUsers(@Body() createUsersDto: CreateUsersDto[]) //calling Dto file
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) //calling Dto file

  {

    return this.usersService.createMany(createManyUsersDto);

  }


}

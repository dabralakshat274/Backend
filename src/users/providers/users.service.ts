import {Injectable,Inject,forwardRef, RequestTimeoutException, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/createuser.dto";
import { User } from "../entities/user.entity";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";
import { CreateUserProvider } from "./create-user.provider";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";

/**
 *Class to connect to users tablke and perform business operations
 */
@Injectable()
export class UsersService
{
constructor(
      /**
     * Injecting usersRespository
     */
    @InjectRepository(User)
      private usersRepository:Repository<User>,

      /**
       * Injecting ConigService
       */


      private readonly configService:ConfigService,



      /**
       * Injecting module specific profiles/config
       */
      @Inject(profileConfig.KEY)
      private readonly profileConfiguration: ConfigType<typeof profileConfig>,



      // /**
      //  * Inject Datasource
      //  */
      // private readonly dataSource:DataSource,



      /**
       * Inject usersCreateManyPorvider
       */
      private readonly usersCreateManyProvider:UsersCreateManyProvider,

      /**
       * Inject createuserProvider
       */
      private readonly createUserProvider:CreateUserProvider,

      /**
       * Inject findOneUserByEmailProvider
       */
      private readonly findOneUserByEmailProvider:FindOneUserByEmailProvider,
  
){}
//Check is user exists with same email
//If exists then Handle Exception
//If not then create a new user



//check user exists or not
public async createUser(createUserDto:CreateUserDto){

  return this.createUserProvider.createUser(createUserDto);

}

/*   // dec;ared in create-user.provider
  let existingUser=undefined;



  try{
   // const existingUser= await this.usersRepository.findOne({
    existingUser = await this.usersRepository.findOne({
        where:{email:createUserDto.email},
    });
  } 
  catch(error){
    //Might want to save the details of the exception
    //Information which is sensitive 
    throw new RequestTimeoutException(
      'Unable to process your request at the moment please try later',
      {
        description:'ERROR CONNECTING TO THE DATABASE'
      })

  }


  if(existingUser){
    throw new BadRequestException(
      'User already exists please check your email',{description:'User exists Bad Request'})
  }


    //Handle exception and create a new user
    let newUser=this.usersRepository.create(createUserDto);
    try{
      newUser= await this.usersRepository.save(newUser);

    } catch(error){
      throw new RequestTimeoutException(
        'Unable to process the request at the moment please try later',
        {
          description:'Error connecting to the database',
        })
    }

    return newUser;
}


//      constructor(
//          //iNJECTING AUTH SERVICE
//          @Inject(forwardRef(()=>AuthService))
//          private readonly authService:AuthService
//      ){}

//     /**
//  *The Method to get all the users from the database
//  */ 
// public findAll(getUserParam:GetUsersParamDto,limit:number,page:number)
// {
//     const isAuth =this.authService.isAuth();
//     console.log(isAuth)
// return[{firstName:'John',email:'john@doe.com'},{firstName:'Alice',email:'alice@doe.com'}];
// } */


//find user by id
public async findOneById(id:number             /*string*/){
    //return {id:1234,firstname:'Alice',email:'alice@doe.com'};

    let user=undefined;
    try{
      user=await this.usersRepository.findOneBy({
        id,})
    } catch(error){
      throw new RequestTimeoutException(
        'Unable to process the request at the moment please try later',
        {
          description:'Error connecting to the database',
        })
    }


    if(!user){
      throw new BadRequestException('The user id does not exists')
    }

    return user; 
    //await this.usersRepository.findOneBy({
    //    id,
    //})

}


public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {

    //throwing custom exception
    throw new HttpException(
      {
      status: HttpStatus.MOVED_PERMANENTLY,
      error:'The API endpoint does not exists',
      fileName:'users.service.ts',
      lineNumber:88,
    
    },

      HttpStatus.MOVED_PERMANENTLY,

      {
        cause:new Error(),
        description:'Occured because the API endpoint was permanentaly removed'
      }
    )





    // get an environment variable
    //const environment = this.configService.get<string>('S3_BUCKET');
    //console.log(environment);




    //test the new config
    // console.log(this.profileConfiguration)
    // console.log(this.profileConfiguration.apiKey)

    // return [
    //   {
    //     firstName: 'John',
    //     email: 'john@doe.com',
    //   },
    //   {
    //     firstName: 'Alice',
    //     email: 'alice@doe.com',
    //   },
    // ];
  }



/*        made seperate provider file for this method

   public async createMany(createUserDto: CreateUserDto[]){
    let newUsers: User[]=[];
    // Create Query Runner Instance
    const queryRunner= this.dataSource.createQueryRunner();

    //Connect Query Runner to Database
    await queryRunner.connect();

    //Start Transation
    await queryRunner.startTransaction();

    try{
      for(let user of createUserDto){
        let newUser = queryRunner.manager.create(User,user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      //If successful commit
      await queryRunner.commitTransaction();
    } catch(error){

    //If unsuccessful rollback
    await queryRunner.rollbackTransaction();

    } finally{

    //Release connection
    await queryRunner.release();

    }
   } */


    //public async createMany(createUsersDto: CreateUsersDto[]){
    public async createMany(createManyUsersDto: CreateManyUsersDto){

      return await this.usersCreateManyProvider.createMany(createManyUsersDto);

    }


    public async findOneByEmail(email:string){
      return await this.findOneUserByEmailProvider.findOneByEmnail(email);
    }


}

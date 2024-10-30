import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/createuser.dto';
import { User } from '../entities/user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        /**
       * Inject Datasource
       */
      private readonly dataSource:DataSource,

    ){}

    //public async createMany(createUsersDto: CreateUsersDto[]){
    public async createMany(createManyUsersDto: CreateManyUsersDto){
    
        let newUsers: User[]=[];
       
        // Create Query Runner Instance
        const queryRunner= this.dataSource.createQueryRunner();
        try{
        //Connect Query Runner to Database
        await queryRunner.connect();
    
        //Start Transation
        await queryRunner.startTransaction();
      } catch(error){
        throw new RequestTimeoutException('Could not connect to the database');
      }
    
        try{
          for(let user of createManyUsersDto.users){
            let newUser = queryRunner.manager.create(User,user);
            let result = await queryRunner.manager.save(newUser);
            newUsers.push(result);
          }
    
          //If successful commit
          await queryRunner.commitTransaction();
        } catch(error){
        //If unsuccessful rollback
    
        console.error('Error during transaction:', error);
        await queryRunner.rollbackTransaction();
        throw new ConflictException('Could not complete the transaction',{
          description: String(error)
        })
        //throw error;
    
        } finally{
          try{
        //Release connection
    
        await queryRunner.release();
      } catch(error){
        throw new RequestTimeoutException('Could not release the connection',{
          description: String(error)
        })
      }
    
        }
        return newUsers;
}
}
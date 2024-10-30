import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createuser.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

@Injectable()
export class CreateUserProvider {

    constructor(
        /**
         * Inject users repository
         */
        @InjectRepository(User)
        private readonly usersRepository:Repository<User>,

        /**
         * Inject hashingprovider
         */
        @Inject(forwardRef(()=>HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ){}

    public async createUser(createUserDto:CreateUserDto){


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
          let newUser=this.usersRepository.create({...createUserDto,
            password:await this.hashingProvider.hashPassword(createUserDto.password)});
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

}

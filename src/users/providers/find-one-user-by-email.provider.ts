import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {

    constructor(
        /**
         * Inject usersRepository
         */
        @InjectRepository(User)
        private readonly usersrepository:Repository<User>
    ){}

    public async findOneByEmnail(email: string){
        let user:User|undefined=undefined;
        try{
            //return null if user is not found
            user = await this.usersrepository.findOneBy({
                email: email,
            })
        }catch(error){
            throw new RequestTimeoutException(error,{
                description:'Could not fetch the user'
            })
        }
        if(!user){
            throw new UnauthorizedException('User does not exists')
        }
        return user;
    }

}

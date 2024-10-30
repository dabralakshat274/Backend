import { Injectable,forwardRef,Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
    constructor(
        //injecting user service
        @Inject(forwardRef(()=>UsersService))
        private readonly usersService:UsersService,

        /**
         * Inject signInProvider
         */
        private readonly signInProvider:SignInProvider,
    ){}

    /*
    public login(email:string,password:string,id:string  ){
        const user=this.usersService.findOneById(12);    
        return 'Sample_Token'
//Check user exists in database 
//login
//return token
    }*/


public async signIn(signInDto:SignInDto){

    return await this.signInProvider.signIn(signInDto)

}



    public isAuth(){
        return true;
    }
}

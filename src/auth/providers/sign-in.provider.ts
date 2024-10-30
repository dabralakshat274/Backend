import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class SignInProvider {
    constructor(
        /**
         * Injecting usersService
         */
        @Inject(forwardRef(()=>UsersService))
        private readonly usersService:UsersService,

        /**
         * Inject hashingProvider
         */
        private readonly hashingProvider:HashingProvider,
        
        /**
         * Injecting jwtService
         */
        private readonly jwtService:JwtService,

        /**
         * injecting jwtConfiguration  
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration:ConfigType<typeof jwtConfig>

    ){}
    public async signIn(signInDto:SignInDto){
    //find user using email id
    //throw exception if user not found
    let user = await this.usersService.findOneByEmail(signInDto.email)



    //if found then compare the password with hash
    let isEqual:boolean=false;                          //=false is setting up a default value
    try{
        isEqual=await this.hashingProvider.comparePassword(signInDto.password,user.password)
    }catch(error){
        throw new RequestTimeoutException(error,
            {description:'Could not compare passwords'})
    }
    if(!isEqual){
        throw new UnauthorizedException('Incorrect Password')
    }



        // //if matched send confirmation
        // return true;


        //generating  tokens
    const accessToken= await this.jwtService.signAsync(
        {
        sub:user.id,
        email:user.email
    }as ActiveUserData,
        {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accessTokenTtl,



        });
        return {accessToken};
    };

}

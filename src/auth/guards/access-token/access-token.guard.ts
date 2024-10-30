import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Injecting JWT service
     */
    private readonly jwtService:JwtService,

    /**
     * Inject JET Configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ){}
  async canActivate(
    context: ExecutionContext,
  //): boolean | Promise<boolean> | Observable<boolean> {
  ):Promise<boolean>  {


    //Extract the request from the execution context
    const request =context.switchToHttp().getRequest();

    //Extract the token from header
    const token =this.extractRequestFromHeader(request);

    //Validate the token
    if(!token){
      throw new UnauthorizedException('Access Denied');
    }

    try{
      const payload=await this.jwtService.verifyAsync(token,this.jwtConfiguration);
      request[REQUEST_USE_KEY]=payload;
      console.log(payload);
    }catch{
      throw new UnauthorizedException('Accesss Denied')
    }

    return true;
  }
  private extractRequestFromHeader(request:Request): string|undefined{
    const [_,token]=request.headers.authorization?.split(' ')??[];
    return token;
  }
}

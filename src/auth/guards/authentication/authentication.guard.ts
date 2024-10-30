import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Authtype } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType=Authtype.Bearer;

  private readonly authTypeGuardmap:Record<Authtype,CanActivate|CanActivate[]>={
    [Authtype.Bearer]:this.accessTokenGuard,
    [Authtype.None]:{canActivate:()=>true},

  }

  constructor(
    private readonly reflector :Reflector,
    private readonly accessTokenGuard:AccessTokenGuard,
  ){}
  async canActivate(context: ExecutionContext,):  Promise<boolean>  {
    //console.log(this.authTypeGuardmap);
    //authTypes from reflector class
    const authTypes=this.reflector.getAllAndOverride(AUTH_TYPE_KEY,
      [context.getHandler(),context.getClass()])??[AuthenticationGuard.defaultAuthType]
      
      //show authTypes
      console.log(`AuthTypes  ${authTypes}`);                      //boiler plate code

    //array of guards
      const guards = authTypes.map((type)=> this.authTypeGuardmap[type]).flat();

      //print all the guards
      console.log(guards);

      //Default error (when user not authorized)
      const error=new UnauthorizedException('Access Denied');

    //loop guards and fire canActivate
    for(const instance of guards){
      const canActivate=await Promise.resolve(instance.canActivate(context)).catch((err)=>{error:err;})
    if(canActivate){
      return true;
    }
    }

    throw error;
    //return true;
  }
}

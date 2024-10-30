import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { Authtype } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
    constructor
    ( private readonly authService:AuthService)//injecting auth service
    {}


    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(Authtype.None)
    public async signIn(@Body() signInDto:SignInDto){
        return this.authService.signIn(signInDto);
    }
}

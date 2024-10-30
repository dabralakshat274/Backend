import { Module,forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { usersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, 
    {                                       // way to declare abstract class i.e, hashingprovider to which bcryptprovider implements
    provide:HashingProvider,
    useClass:BcryptProvider
  }, SignInProvider],
  imports:[forwardRef(()=>usersModule),
    ConfigModule.forFeature(jwtConfig),
  JwtModule.registerAsync(jwtConfig.asProvider())      //way to inject jwtmodule(not using usefactory)
  ],
  exports:[AuthService,HashingProvider]
})
export class AuthModule {}

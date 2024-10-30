import { Module,forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller ";
import { UsersService } from "./providers/users.service"; //importing UsersService
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from "./config/profile.config";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "src/auth/config/jwt.config";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "src/auth/guards/access-token/access-token.guard";


@Module({
    controllers:[UsersController],
    providers:[UsersService, UsersCreateManyProvider, CreateUserProvider, 
        FindOneUserByEmailProvider,
        /*{
            provide: APP_GUARD,                //makes entire application protected
            useClass: AccessTokenGuard
        }*/
            ], //importing UsersService

    exports:[UsersService,usersModule],
    imports:[forwardRef(()=>AuthModule),            //circular dependency
        TypeOrmModule.forFeature([User]),
        ConfigModule.forFeature(profileConfig), /*ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())*/ ]
})
export class usersModule{} 
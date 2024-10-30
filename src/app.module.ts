import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* user created module*/
import { usersModule } from 'src/users/users.module';
import { UserModule } from './user/user.module';
import { TestModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from "./config/app.config"
import databaseConfig from "./config/database.config"
import environmentValidation from './config/environment.validation';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';



const ENV=process.env.NODE_ENV;



@Module({
  /*imports: [usersModule,UserModule, TestModule, AuthModule,
  TypeOrmModule.forRoot
  ({
 type:'postgres',
 entities:[],
 synchronize:true,
 port:5432,
 username:'postgres',
 password:'admin',
 host:'localhost',
 database:'nestjs-blog'
  })],
  controllers: [AppController],
  providers: [AppService],
})*/

imports: [usersModule,UserModule, TestModule, AuthModule,ConfigModule.forRoot({
  isGlobal:true, 
  //envFilePath:['.env.development']
  envFilePath:!ENV ?'.env':`.env.${ENV}`,
  load:[appConfig,databaseConfig] ,                                    // loading app.config file (Custom configuration file)
  validationSchema:environmentValidation,                  //
}),
  TypeOrmModule.forRootAsync
  ({ 
    imports:[ConfigModule,
      ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider())],

    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      type:'postgres',
      //entities:[User],
      //autoLoadEntities:true,     //this will auto load all the entities no need to seperately do it
      //synchronize:true,  //synchronizing between nest-js and postgres

      //using custom configuration file property
      autoLoadEntities: configService.get('database.autoLoadEntities'),
      synchronize: configService.get('database.synchronize'),
      port: +configService.get('database.port'),      //+ is for transforming(port no.) string to integer 
      username: configService.get('database.user'),
      password: configService .get('database.password'),
      host: configService.get('database.host'),
      database: configService.get('database.name'),





      //{          //using .env config file environments

      //port: +configService.get("Database_PORT"),      //+ is for transforming(port no.) string to integer 
      //username: configService.get("Database_USER"),
      //password: configService.get("Database_PASSWORD"),
      //host: configService.get("Database_HOST"),
      //database: configService.get("Database_NAME"),
    //}



      // port:5432,
      // username:"postgres",
      // password:"admin",
      // host:"localhost",
      // database:"nestjs-blog"
    }),

  }),
  TagsModule,
  MetaOptionsModule,
  PaginationModule,
  ConfigModule.forFeature(jwtConfig),
  JwtModule.registerAsync(jwtConfig.asProvider())
],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,                //makes entire application protected
    //useClass: AccessTokenGuard,
    useClass: AuthenticationGuard

},AccessTokenGuard,],
})

export class AppModule {}

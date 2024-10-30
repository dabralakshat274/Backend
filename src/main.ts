import { NestFactory } from '@nestjs/core';   //
import { AppModule } from './app.module';  /* importing app module from the
 folder named - app      */
import { BadRequestException, ValidationPipe } from '@nestjs/common'; // importing validation pipe
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, forbidNonWhitelisted:true,transform:true,transformOptions:{enableImplicitConversion:true},
    exceptionFactory: (errors) => new BadRequestException(
      errors.map(err => ({
          field: err.property,
          issues: Object.values(err.constraints || {}).join(', '),
      }))
  ),
  }) )

  const config=new DocumentBuilder().setTitle('NestJs Masterclass-Blog app API')
  .setDescription('Use the base API URL as http://localhost:3000 ')
  .setTermsOfService('http://localhost:3000/terms-of-service')
  .setLicense('Mit License','https://github.com/git/git-scm.com/blob/main/MIT-License.txt')
  .addServer('http://localhost:3000')
  .setVersion('1.0')
  .build();

  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)

  await app.listen(3000); // local host port 3300 it can be changed also
console.log("Hello From NestJS");
}
bootstrap();

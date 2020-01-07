import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// import * as mongoose from 'mongoose'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // 连接mongodb
  // mongoose.connect('mongodb://localhost/nestjs-helloworld',{
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false
  // })

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  // 初始化Swagger
  const options = new DocumentBuilder()
    .setTitle('Hellow World API')
    .setDescription('first nestJs project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8089);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerGlobal } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
    },
  );

  // LoggerGlobal -> registra las apis con la fecha
  app.use(LoggerGlobal)
  
  // Start Swagger configuration
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Trading')
  .setDescription("Api trading")
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  // End Swagger configuration
  
  await app.listen(3000);
}
bootstrap();

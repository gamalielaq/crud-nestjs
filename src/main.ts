import { SERVER_PORT } from './config/constants';
import { ConfigService } from '@nestjs/config';
import { initSwagger } from './app.swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  await app.listen(port);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();

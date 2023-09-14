import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: 'https://portfolio-7v0fiftqv-shelly07n.vercel.app', // Replace with the actual URL of your Vue.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and headers with credentials
  };

  app.enableCors(corsOptions);
  await app.listen(5000);

}
bootstrap();

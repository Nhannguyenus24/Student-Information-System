import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
  require('dotenv').config();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
   // Cấu hình Swagger
   const config = new DocumentBuilder()
   .setTitle('API NestJS')
   .setDescription('Tài liệu API cho ứng dụng NestJS')
   .setVersion('1.0')
   .addBearerAuth() // Thêm xác thực bằng JWT (nếu cần)
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api/docs', app, document); // Định tuyến tài liệu Swagger tại /api/docs
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

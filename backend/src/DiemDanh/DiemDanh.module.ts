import { Module } from '@nestjs/common';
import { DiemDanhService } from './DiemDanh.service';
import { DiemDanhController } from './DiemDanh.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiemDanh, DiemDanhSchema } from 'src/schemas/DiemDanh.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DiemDanh.name, schema: DiemDanhSchema }])
  ],
  providers: [DiemDanhService],
  controllers: [DiemDanhController]
})
export class DiemDanhModule {}

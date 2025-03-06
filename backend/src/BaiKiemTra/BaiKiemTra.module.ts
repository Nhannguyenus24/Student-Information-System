import { Module } from '@nestjs/common';
import { BaiKiemTraService } from './BaiKiemTra.service';
import { BaiKiemTraController } from './BaiKiemTra.controller';
import { BaiKiemTra, BaiKiemTraSchema } from 'src/schemas/BaiKiemTra.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: BaiKiemTra.name, schema: BaiKiemTraSchema }])],
  providers: [BaiKiemTraService],
  controllers: [BaiKiemTraController]
})
export class BaiKiemTraModule {}

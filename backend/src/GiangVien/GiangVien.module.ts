import { Module } from '@nestjs/common';
import { GiangVienService } from './GiangVien.service';
import { GiangVienController } from './GiangVien.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GiangVien, GiangVienSchema } from 'src/schemas/GiangVien.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: GiangVien.name, schema: GiangVienSchema   }])],
  providers: [GiangVienService],
  controllers: [GiangVienController]
})
export class GiangVienModule {}

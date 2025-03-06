import { Module } from '@nestjs/common';
import { SinhVienService } from './SinhVien.service';
import { SinhVienController } from './SinhVien.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SinhVien, SinhVienSchema } from 'src/schemas/SinhVien.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SinhVien.name, schema: SinhVienSchema}]),
  ],
  providers: [SinhVienService],
  controllers: [SinhVienController]
})
export class SinhVienModule {}

import { Module } from '@nestjs/common';
import { ThamGiaKiemTraService } from './ThamGiaKiemTra.service';
import { ThamGiaKiemTraController } from './ThamGiaKiemTra.controller';
import { ThamGiaKiemTra, ThamGiaKiemTraSchema } from 'src/schemas/ThamGiaKiemTra.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ThamGiaKiemTra.name, schema: ThamGiaKiemTraSchema }])],
  providers: [ThamGiaKiemTraService],
  controllers: [ThamGiaKiemTraController]
})
export class ThamGiaKiemTraModule {}

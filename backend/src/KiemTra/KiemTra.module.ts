import { Module } from '@nestjs/common';
import { KiemTraService } from './KiemTra.service';
import { KiemTraController } from './KiemTra.controller';
import { KiemTra, KiemTraSchema } from 'src/schemas/KiemTra.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: KiemTra.name, schema: KiemTraSchema }])],
  providers: [KiemTraService],
  controllers: [KiemTraController]
})
export class KiemTraModule {}

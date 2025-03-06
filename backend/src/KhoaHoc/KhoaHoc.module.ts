import { Module } from '@nestjs/common';
import { KhoaHocService } from './KhoaHoc.service';
import { KhoaHocController } from './KhoaHoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KhoaHoc, KhoaHocSchema } from 'src/schemas/KhoaHoc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: KhoaHoc.name, schema: KhoaHocSchema }])],
  providers: [KhoaHocService],
  controllers: [KhoaHocController]
})
export class KhoaHocModule {}

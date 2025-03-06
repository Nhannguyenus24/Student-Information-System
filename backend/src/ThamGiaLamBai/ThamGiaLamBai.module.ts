import { Module } from '@nestjs/common';
import { ThamGiaLamBaiService } from './ThamGiaLamBai.service';
import { ThamGiaLamBaiController } from './ThamGiaLamBai.controller';
import { ThamGiaLamBai, ThamGiaLamBaiSchema } from 'src/schemas/ThamGiaLamBai.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ThamGiaLamBai.name, schema: ThamGiaLamBaiSchema }])],
  providers: [ThamGiaLamBaiService],
  controllers: [ThamGiaLamBaiController]
})
export class ThamGiaLamBaiModule {}

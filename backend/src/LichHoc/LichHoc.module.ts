import { Module } from '@nestjs/common';
import { LichHocService } from './LichHoc.service';
import { LichHocController } from './LichHoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LichHoc, LichHocSchema } from 'src/schemas/LichHoc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: LichHoc.name, schema: LichHocSchema}]),
  ],
  providers: [LichHocService],
  controllers: [LichHocController]
})
export class LichHocModule {}

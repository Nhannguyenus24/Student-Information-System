import { Module } from '@nestjs/common';
import { LichService } from './Lich.service';
import { LichController } from './Lich.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lich, LichSchema } from 'src/schemas/Lich.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Lich.name, schema: LichSchema}]),
  ],
  providers: [LichService],
  controllers: [LichController]
})
export class LichModule {}

import { Module } from '@nestjs/common';
import { TuitionService } from './tuition.service';
import { TuitionController } from './tuition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tuition, TuitionSchema } from 'src/schemas/tuition.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Tuition.name, schema: TuitionSchema }])
  ],
  providers: [TuitionService],
  controllers: [TuitionController]
})
export class TuitionModule {}

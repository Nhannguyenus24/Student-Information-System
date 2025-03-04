import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Schedule.name, schema: ScheduleSchema}]),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}

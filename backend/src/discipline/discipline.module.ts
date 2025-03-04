import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Discipline, DisciplineSchema } from 'src/schemas/discipline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Discipline.name, schema: DisciplineSchema}]),
  ],
  providers: [DisciplineService],
  controllers: [DisciplineController]
})
export class DisciplineModule {}

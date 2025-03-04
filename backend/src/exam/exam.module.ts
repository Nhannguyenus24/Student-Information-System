import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam, ExamSchema } from 'src/schemas/exam.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }])],
  providers: [ExamService],
  controllers: [ExamController]
})
export class ExamModule {}

import { Module } from '@nestjs/common';
import { ExamSubmissionService } from './exam-submission.service';
import { ExamSubmissionController } from './exam-submission.controller';
import { ExamSubmission, ExamSubmissionSchema } from 'src/schemas/examSubmission.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExamSubmission.name, schema: ExamSubmissionSchema }])],
  providers: [ExamSubmissionService],
  controllers: [ExamSubmissionController]
})
export class ExamSubmissionModule {}

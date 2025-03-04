import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExamModule } from './exam/exam.module';
import { ExamSubmissionModule } from './exam-submission/exam-submission.module';
import { ScoreModule } from './score/score.module';
import { DisciplineModule } from './discipline/discipline.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';
import { TuitionModule } from './tuition/tuition.module';
import { ParentModule } from './parent/parent.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sis:sis@cluster0.xqphw.mongodb.net/'),
    StudentModule,
    AttendanceModule,
    ExamModule,
    ExamSubmissionModule,
    ScoreModule,
    DisciplineModule,
    ScheduleModule,
    CourseModule,
    TeacherModule,
    TuitionModule,
    ParentModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

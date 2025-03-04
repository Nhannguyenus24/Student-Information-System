import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
  ],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}

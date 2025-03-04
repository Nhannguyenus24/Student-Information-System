import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from 'src/schemas/teacher.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema   }])],
  providers: [TeacherService],
  controllers: [TeacherController]
})
export class TeacherModule {}

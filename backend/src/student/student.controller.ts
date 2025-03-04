import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from 'src/schemas/student.schema';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() profile: Partial<Student>): Promise<Student> {
    return this.studentService.create(profile);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student | null> {
    return this.studentService.findOne(id);
  }
}
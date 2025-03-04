import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentProfileModel: Model<StudentDocument>) {}

  async create(profile: Partial<Student>): Promise<Student> {
    const createdProfile = new this.studentProfileModel(profile);
    return createdProfile.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentProfileModel.find().exec();
  }

  async findOne(id: string): Promise<Student | null                > {
    return this.studentProfileModel.findById(id).exec();
  }
}
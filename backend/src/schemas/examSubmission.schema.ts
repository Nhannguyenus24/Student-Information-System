import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExamSubmissionDocument = ExamSubmission & Document;

@Schema()
export class ExamSubmission {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  BaiKiemTraID: Types.ObjectId;

  @Prop({ type: Date })
  NgayLam: Date;

  @Prop()
  Diem: number;

  @Prop({ enum: ['Chờ chấm', 'Đã chấm', 'Tự chấm'], default: 'Chờ chấm' })
  TrangThai: string;

  @Prop()
  GhiChu: string;
}

export const ExamSubmissionSchema = SchemaFactory.createForClass(ExamSubmission);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class SinhVienDangKy {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  SinhVienID: Types.ObjectId;
}

@Schema()
export class TaiLieu {
  @Prop({ required: true })
  TenTaiLieu: string;

  @Prop({ required: true })
  LinkTaiLieu: string;
}

@Schema()
export class Course {
  @Prop({ required: true })
  TenKhoaHoc: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  GiangVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  TroGiang: Types.ObjectId;

  @Prop({ required: true })
  SoTinChi: number;

  @Prop()
  MoTa: string;

  @Prop({ type: [SinhVienDangKy], default: [] })
  SinhVienDangKy: SinhVienDangKy[];

  @Prop({ type: [TaiLieu], default: [] })
  TaiLieu: TaiLieu[];

  @Prop({ type: Date, default: Date.now })
  NgayCapNhat: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
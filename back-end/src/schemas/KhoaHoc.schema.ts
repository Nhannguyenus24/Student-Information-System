import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type KhoaHocDocument = KhoaHoc & Document;

@Schema()
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TaiLieu', required: true })
  TaiLieu: Types.ObjectId;

  // @Prop({ type: Date, default: Date.now })
  // NgayNop: Date;
}

@Schema()
export class Deadline {
  @Prop({ required: true })
  MoTa: string;

  @Prop({ type: Date, required: true })
  NgayBatDau: Date;

  @Prop({ type: Date, required: true })
  NgayHetHan: Date;

  @Prop({ type: [Submission], default: [] })
  Submissions: Submission[]; 
}

@Schema()
export class KhoaHoc {
  @Prop({required: true, unique: true})
  MaKhoaHoc: string;
  
  @Prop({ required: true, unique: true })
  TenKhoaHoc: string;

  @Prop({ type: [Types.ObjectId], ref: 'GiangVien' })
  GiangVienID: Types.ObjectId[];

  @Prop({ required: true })
  SoTinChi: number;

  @Prop()
  MoTa: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SinhVien' }], default: [] })
  SinhVienDangKy: Types.ObjectId[];
  
  @Prop({ type: [Deadline], default: [] })
  Deadlines: Deadline[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TaiLieu' }], default: [] })
  TaiLieu: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  NgayCapNhat: Date;

  @Prop({ required: true })
  SoLuongToiDa: number;

  @Prop({ default: 0 })
  SoLuongSinhVienDangKy: number;

  @Prop({ required: true})
  HanDangKy: Date;

  @Prop({required: true})
  NgayBatDau: Date;

  @Prop({required: true})
  NgayKetThuc: Date;

  @Prop({type:Types.ObjectId, ref:'Khoa', required: true})
  KhoaID: Types.ObjectId;
}

export const KhoaHocSchema = SchemaFactory.createForClass(KhoaHoc);
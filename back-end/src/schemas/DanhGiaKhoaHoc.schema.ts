import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DanhGiaKhoaHocDocument = DanhGiaKhoaHoc & Document;

@Schema()
export class DanhGiaKhoaHoc {
  @Prop({ type: Types.ObjectId, ref: 'KhoaHoc', required: true })
  KhoaHocID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ type: Number, min: 0, max: 5, required: true })
  SoSao: number;

  @Prop({ type: String})
  DanhGia?: string;

  @Prop({ type: Date, default: Date.now })
  ThoiGianDanhGia: Date;
}

export const DanhGiaKhoaHocSchema = SchemaFactory.createForClass(DanhGiaKhoaHoc);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ThamGiaLamBaiDocument = ThamGiaLamBai & Document;

@Schema()
export class ThamGiaLamBai {
  @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'KiemTra', required: true })
  BaiKiemTraID: Types.ObjectId;

  @Prop({ type: Date })
  NgayLam: Date;

  @Prop()
  Diem: number;

  @Prop({ enum: ['Pending', 'Graded', 'Auto'], default: 'Pending' })
  TrangThai: string;

  @Prop()
  GhiChu: string;
}

export const ThamGiaLamBaiSchema = SchemaFactory.createForClass(ThamGiaLamBai);
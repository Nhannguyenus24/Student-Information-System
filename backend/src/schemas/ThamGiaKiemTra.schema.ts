import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ThamGiaKiemTraDocument = ThamGiaKiemTra & Document;

@Schema()
export class ThamGiaKiemTra {
  @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'KiemTra', required: true })
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

export const ThamGiaKiemTraSchema = SchemaFactory.createForClass(ThamGiaKiemTra);
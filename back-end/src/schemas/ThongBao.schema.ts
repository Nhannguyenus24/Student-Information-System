import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ThongBaosDocument = ThongBaos & Document;

@Schema()
export class ThongBaos {
  @Prop({ required: true })
  TenThongBao: string;

  @Prop({ required: true })
  NoiDung: string;

  @Prop({ required: true, enum: ['GiangVien', 'SinhVien', 'Khoa', 'KhoaHoc', 'NienKhoa'] })
  NhomGui: string;

  @Prop({ type: Types.ObjectId, ref: 'Khoa' })
  KhoaID?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'KhoaHoc', required: false })
  KhoaHocID?: Types.ObjectId;

  @Prop({ default: Date.now })
  NgayTao: Date;
}

export const ThongBaosSchema = SchemaFactory.createForClass(ThongBaos);

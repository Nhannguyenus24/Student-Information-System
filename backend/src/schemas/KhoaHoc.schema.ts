import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KhoaHocDocument = KhoaHoc & Document;

@Schema()
export class TaiLieu {
  @Prop({ required: true })
  TenTaiLieu: string;

  @Prop({ required: true })
  LinkTaiLieu: string;
}

@Schema()
export class KhoaHoc {
  @Prop({ required: true, unique: true })
  TenKhoaHoc: string;

  @Prop({ type: Types.ObjectId, ref: 'GiangVien', required: true })
  GiangVienID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'GiangVien' })
  TroGiangID: Types.ObjectId;

  @Prop({ required: true })
  SoTinChi: number;

  @Prop()
  MoTa: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SinhVien' }], default: [] })
  SinhVienDangKy: Types.ObjectId[];

  @Prop({ type: [TaiLieu], default: [] })
  TaiLieu: TaiLieu[];

  @Prop({ type: Date, default: Date.now })
  NgayCapNhat: Date;
}

export const KhoaHocSchema = SchemaFactory.createForClass(KhoaHoc);
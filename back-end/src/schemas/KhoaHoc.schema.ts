import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type KhoaHocDocument = KhoaHoc & Document;

// @Schema()
// export class TaiLieu {
//   @Prop({ required: true })
//   TenTaiLieu: string;

//   @Prop({ required: true })
//   LinkTaiLieu: string;
// }

@Schema()
export class KhoaHoc {
  @Prop({required: true, unique: true})
  MaKhoaHoc: string;
  
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SinhVien' }], default: [] })
  SinhVienDangKy: Types.ObjectId[];
  
// fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  // @Prop({ type: [TaiLieu], default: [] })
  // TaiLieu: TaiLieu[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TaiLieu' }], default: [] }) // Danh sách ID tài liệu
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
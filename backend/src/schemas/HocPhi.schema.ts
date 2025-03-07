import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HocPhiDocument = HocPhi & Document;

@Schema()
export class GiaHanHocPhi {
  @Prop()
  CoGiaHanHocPhi: boolean;

  @Prop({ type: Date })
  ThoiGianGiaHan: Date;

  @Prop()
  LyDo: string;
}

@Schema()
export class HocPhi {
    @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'KhoaHoc' })
    KhoaHocID: Types.ObjectId;

    @Prop()
    HocKy: number;

    @Prop({ type: Date })
    NamHoc: Date;

    @Prop()
    NoiDung: string;

    @Prop({ type: Number, precision: 10, scale: 2 }) // decimal(10, 2)
    SoTienCanDong: number;

    @Prop({ enum: ['Paid', 'Unpaid', 'Extended'], default: 'Unpaid' })
    TrangThaiThanhToan: string;

    @Prop({ type: Date })
    HanDongHocPhi: Date;

    @Prop({ type: GiaHanHocPhi })
    GiaHanHocPhi: GiaHanHocPhi;

    @Prop({ type: Date, default: Date.now })
    NgayTao: Date;
}

export const HocPhiSchema = SchemaFactory.createForClass(HocPhi);
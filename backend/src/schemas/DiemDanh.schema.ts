import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DiemDanhDocument = DiemDanh & Document;

@Schema()
export class DiemDanh {
    @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref:'KhoaHoc', required: true })
    KhoaHocID: Types.ObjectId;

    @Prop({ type: Date, required: true })
    NgayHoc: Date;

    @Prop({ enum: ['Có mặt', 'Vắng', 'Muộn'], default: 'Có mặt' })
    TrangThai: string;

    @Prop()
    GhiChu: string;

    @Prop({ type: Date, default: Date.now })
    NgayCapNhat: Date;
}

export const DiemDanhSchema = SchemaFactory.createForClass(DiemDanh);
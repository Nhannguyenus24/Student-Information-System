import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KyLuatDocument = KyLuat & Document;

@Schema()
export class KyLuat {
    @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ required: true })
    NoiDung: string;

    @Prop({ type: Date })
    NgayLap: Date;

    @Prop({ enum: ['Processing', 'Processed'], default: 'Processing' })
    TrangThai: string;

    @Prop()
    HinhThucXuLy: string;

    @Prop({ type: Date, default: Date.now })
    NgayCapNhat: Date;
}

export const KyLuatSchema = SchemaFactory.createForClass(KyLuat);
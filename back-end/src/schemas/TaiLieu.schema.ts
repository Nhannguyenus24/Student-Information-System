import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaiLieuDocument = TaiLieu & Document;

@Schema()
export class TaiLieu {
    @Prop({ required: true })
    TenTaiLieu: string;

    @Prop({ required: true })
    LinkTaiLieu: string;

    @Prop({ required: true, default: '' })
    MoTa: string;

    @Prop({ required: true })
    TenNguoiDung: string;

//   @Prop({ type: Types.ObjectId, ref: 'KhoaHoc' })
//   khoaHocId: Types.ObjectId;
}

export const TaiLieuSchema = SchemaFactory.createForClass(TaiLieu);
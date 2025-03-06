import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DiemDocument = Diem & Document;

@Schema()
export class DiemThanhPhan {
    @Prop()
    LoaiDiem: string;

    @Prop()
    HeSo: number;

    @Prop()
    Diem: number;
    
    @Prop({ type: Types.ObjectId, ref: 'ThamGiaKiemTra' })
    BaiKiemTraID: Types.ObjectId;
}

@Schema()
export class Diem {
    @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref:'KhoaHoc', required: true })
    KhoaHocID: Types.ObjectId;

    @Prop({ type: [DiemThanhPhan] })
    DiemThanhPhan: DiemThanhPhan[];


}

export const DiemSchema = SchemaFactory.createForClass(Diem);
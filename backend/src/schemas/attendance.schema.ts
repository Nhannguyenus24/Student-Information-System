import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref:'Course', required: true })
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

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
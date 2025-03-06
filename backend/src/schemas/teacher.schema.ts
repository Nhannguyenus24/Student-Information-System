import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
    @Prop({ required: true })
    HoTen: string;

    @Prop({ type: Date })
    NgaySinh: Date;

    @Prop()
    GioiTinh: string;

    @Prop()
    DiaChi: string;

    @Prop({required: true, unique: true})
    SoDienThoai: string;

    @Prop({required: true, unique: true})
    Email: string;

    @Prop()
    ChucVu: string;

    @Prop()
    Khoa: string;

    @Prop({ required: true, unique: true })
    CCCD: string;

    @Prop()
    TrinhDo: string;

    @Prop({ type: Date })
    NgayVaoLam: Date;

    @Prop({ type: Date, default: Date.now })
    NgayCapNhat: Date;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
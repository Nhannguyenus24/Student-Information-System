import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SinhVienDocument = SinhVien & Document;

@Schema()
export class SinhVien {
    @Prop()
    HoTen: string;

    @Prop()
    NgaySinh: Date;

    @Prop()
    GioiTinh: string;

    @Prop()
    DiaChi: string;

    @Prop( {unique: true})
    SoDienThoai: string;

    @Prop()
    Khoa: string;

    @Prop({ unique: true })
    CCCD: string;

    @Prop()
    Anh: string;

    @Prop({ enum: ['đang học', 'bảo lưu', 'tốt nghiệp', 'nghỉ học'], default: 'đang học' })
    TrangThai: string;
    
    @Prop({ type: Date, default: Date.now })
    ThoiGianCapNhat: Date;

}
export const SinhVienSchema = SchemaFactory.createForClass(SinhVien);
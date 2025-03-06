import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SinhVienDocument = SinhVien & Document;

@Schema()
export class Token {
    @Prop()
    accessToken: string;

    @Prop({ type: Date })
    accessTokenExpires: Date;

    @Prop()
    refreshToken: string;

    @Prop({ type: Date })
    refreshTokenExpires: Date;

    @Prop()
    resetToken: string;

    @Prop({ type: Date })
    resetTokenExpires: Date;
}

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

    @Prop({unique: true})
    Email: string;

    @Prop()
    Khoa: string;

    @Prop({ unique: true })
    CCCD: string;

    @Prop()
    Anh: string;

    @Prop({ enum: ['đang học', 'bảo lưu', 'tốt nghiệp', 'nghỉ học'], default: 'đang học' })
    TrangThai: string;

    @Prop({required: true})
    password: string;
    
    @Prop({type: [Token]})
    token: Token;
    
    @Prop({ type: Date, default: Date.now })
    ThoiGianCapNhat: Date;

}
export const SinhVienSchema = SchemaFactory.createForClass(SinhVien);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NguoiDungDocument = NguoiDung & Document;

@Schema()
export class Token {
    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop()
    resetToken: string;
}

@Schema()
export class NguoiDung {

    @Prop({unique: true})
    Email: string;

    @Prop({unique: true})
    username: string;

    @Prop({required: true})
    MatKhau: string;
    
    @Prop({type: [Token]})
    token: Token;

    @Prop({ enum: ['Sinh viên', 'Giảng viên', 'Quản trị viên'], default: 'Sinh viên' })
    role: string;


}
export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);

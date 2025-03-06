import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NguoiDungDocument = NguoiDung & Document;

@Schema()
export class Token {
    @Prop()
    AccessToken: string;

    @Prop()
    RefreshToken: string;

    @Prop()
    ResetToken: string;
}

@Schema()
export class NguoiDung {

    @Prop({unique: true})
    Email: string;

    @Prop({unique: true})
    Username: string;

    @Prop({required: true})
    MatKhau: string;
    
    @Prop({type: Token})
    Token: Token;

    @Prop({ enum: ['Sinh viên', 'Giảng viên', 'Quản trị viên'], default: 'Sinh viên' })
    Role: string;


}
export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);

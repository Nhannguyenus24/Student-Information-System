import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";




export type ParentDocument = Parent & Document;

@Schema()
export class ThongBao{
    @Prop({required: true})
    NoiDungThongBao: string;

    @Prop({ enum: ['email', 'sms', 'cả hai'], default: 'email' })
    PhuongThucGui: string;
}
@Schema()
export class Parent{
    @Prop({ type: Types.ObjectId, ref: 'Student', required: true})
    StudentID: Types.ObjectId;

    @Prop({required: true})
    HoTen: string;

    @Prop()
    Email: string;

    @Prop()
    SoDienThoai: string;

    @Prop({required: true})
    MoiQuanHe: string;

    @Prop()
    DiaChi: string;

    @Prop({type: [ThongBao], default: []} )
    ThongBao: [ThongBao];
}
export const ParentSchema = SchemaFactory.createForClass(Parent);
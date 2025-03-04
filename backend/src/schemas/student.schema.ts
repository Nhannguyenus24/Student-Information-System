import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;
@Schema()
export class Student {
    @Prop()
    fullname: string;

    @Prop()
    dob: Date;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    Email: string;

    @Prop()
    faculty: string;

    @Prop({ unique: true })
    identity: string;

    @Prop()
    Image: string;

    @Prop({ enum: ['đang học', 'bảo lưu', 'tốt nghiệp', 'nghỉ học'], default: 'đang học' })
    status: string;

    @Prop({ type: Date, default: Date.now })
    updateTime: Date;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
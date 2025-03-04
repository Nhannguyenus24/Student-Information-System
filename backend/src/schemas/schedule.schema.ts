import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
    @Prop({type: Types.ObjectId, ref: 'Course', required: true})
    KhoaHocID: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Teacher'})
    GiangVienID: Types.ObjectId;

    @Prop({ type: Date })
    NgayHoc: Date;

    @Prop({type: Date})
    ThoiGianBatDau: Date;

    @Prop({type: Date})
    ThoiGianKetThuc: Date;

    @Prop()
    DiaDiem: string;

    @Prop({ type: Date, default: Date.now })
    NgayCapNhat: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule); 
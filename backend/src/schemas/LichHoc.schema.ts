import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export type LichHocDocument = LichHoc & Document;

@Schema()
export class LichHoc {
    @Prop({type: Types.ObjectId, ref: 'KhoaHoc', required: true})
    KhoaHocID: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'GiangVien'})
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

export const LichHocSchema = SchemaFactory.createForClass(LichHoc); 
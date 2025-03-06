import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KiemTraDocument = KiemTra & Document;

@Schema()
export class DeThi {
    @Prop()
    CauHoi: string;

    @Prop()
    DapAn: string;
}

@Schema()
export class DanhGia {
    @Prop()
    NoiDung: string;

    @Prop()
    NguoiDanhGia: string;

    @Prop({ type: Date })
    ThoiGianDanhGia: Date;
}

@Schema()
export class KiemTra {
    @Prop({ required: true })
    TenBaiKiemTra: string;

    @Prop()
    MoTa: string;

    @Prop({ type: Types.ObjectId })
    KhoaHocID: Types.ObjectId;

    @Prop({ type: [DeThi] })
    DeThi: DeThi[];

    @Prop()
    ThoiGianLam: number;

    @Prop({ type: DanhGia })
    DanhGia: DanhGia;

    @Prop({ type: Date })
    ThoiGianBatDau: Date;

    @Prop({ type: Date })
    ThoiGianKetThuc: Date;

}

export const KiemTraSchema = SchemaFactory.createForClass(KiemTra);
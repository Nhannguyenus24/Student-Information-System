import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScoreDocument = Score & Document;

@Schema()
export class DiemThanhPhan {
    @Prop()
    LoaiDiem: string;

    @Prop()
    HeSo: number;

    @Prop()
    Diem: number;
    
    @Prop({ type: Types.ObjectId, ref: 'ExamSubmission' })
    BaiLamID: Types.ObjectId;
}

@Schema()
export class Score {
    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    SinhVienID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref:'Course', required: true })
    KhoaHocID: Types.ObjectId;

    @Prop({ type: [DiemThanhPhan] })
    DiemThanhPhan: DiemThanhPhan[];


}

export const ScoreSchema = SchemaFactory.createForClass(Score);
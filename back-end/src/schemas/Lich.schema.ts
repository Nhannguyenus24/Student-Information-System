import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type LichDocument = Lich & Document;

@Schema()
class GhiChu {
  @Prop({ required: true })
  NoiDung: string;

  @Prop({ type: Date, default: Date.now })
  ThoiGianTao: Date;
}

export
@Schema()
class Lich {
  @Prop({ type: Types.ObjectId, ref: 'SinhVien', required: true })
  SinhVienID: Types.ObjectId;

  @Prop({ default: [] })
  GhiChu: GhiChu[];
}

export const LichSchema = SchemaFactory.createForClass(Lich);

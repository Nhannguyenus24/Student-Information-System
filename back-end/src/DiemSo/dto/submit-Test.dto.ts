import { IsArray, IsMongoId, IsNumber } from 'class-validator';

export class SubmitTestDto {
  @IsMongoId()
  BaiKiemTraID: string;

  @IsArray()
  @IsNumber({}, { each: true })
  kquaLamBai: number[];
}

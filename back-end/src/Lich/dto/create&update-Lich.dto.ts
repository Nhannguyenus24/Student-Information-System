import {
  IsMongoId,
  IsArray,
  ValidateNested,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class GhiChuDto {
  @IsOptional()
  @IsString()
  NoiDung: string;

  @IsOptional()
  ThoiGianTao?: Date;
}

export class CreateAndUpdateLichDto {
  @IsMongoId()
  SinhVienID: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GhiChuDto)
  GhiChu: GhiChuDto[];
}

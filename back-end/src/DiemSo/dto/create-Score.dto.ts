import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateDiemThanhPhanDto {
  @IsString()
  LoaiDiem: string;

  @IsNumber()
  HeSo: number;

  @IsNumber()
  Diem: number;

  @IsMongoId()
  BaiKiemTraID: string;

  @IsBoolean()
  @IsOptional()
  isAttempt?: boolean;

  @IsBoolean()
  @IsOptional()
  isCheating?: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startTime?: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  kquaLamBai?: number[];
}

export class CreateScoreDto {
  @IsMongoId()
  SinhVienID: string;

  @IsMongoId()
  KhoaHocID: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiemThanhPhanDto)
  DiemThanhPhan: CreateDiemThanhPhanDto[];
}

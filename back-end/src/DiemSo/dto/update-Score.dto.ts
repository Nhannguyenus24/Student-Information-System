import { Type } from 'class-transformer';
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

class UpdateDiemThanhPhanDto {
  @IsOptional()
  @IsString()
  LoaiDiem?: string;

  @IsOptional()
  @IsNumber()
  HeSo?: number;

  @IsOptional()
  @IsNumber()
  Diem?: number;

  @IsOptional()
  @IsMongoId()
  BaiKiemTraID?: string;

  @IsOptional()
  @IsBoolean()
  isAttempt?: boolean;

  @IsOptional()
  @IsBoolean()
  isCheating?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  kquaLamBai?: number[];
}

export class UpdateScoreDto {
  @IsOptional()
  @IsMongoId()
  SinhVienID?: string;

  @IsOptional()
  @IsMongoId()
  KhoaHocID?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDiemThanhPhanDto)
  DiemThanhPhan?: UpdateDiemThanhPhanDto[];
}

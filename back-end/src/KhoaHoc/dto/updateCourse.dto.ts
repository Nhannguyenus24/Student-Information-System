import { IsString, IsInt, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCourseDto {

  @IsOptional()
  @IsInt()
  SoTinChi?: number;

  @IsOptional()
  @IsString()
  MoTa?: string;

  @IsOptional()
  HanDangKy: Date;

  @IsInt()
  @IsOptional()
  SoLuongToiDa: number;

  @IsOptional()
  NgayBatDau: Date;

  @IsOptional()
  NgayKetThuc: Date;
}

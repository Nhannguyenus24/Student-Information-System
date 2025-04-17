import { IsString, IsInt, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCourseDto {
  // @IsOptional()
  // @IsString()
  // TenKhoaHoc?: string;

  @IsOptional()
  @IsString()
  GiangVienID?: Types.ObjectId;

  // @IsOptional()
  // @IsString()
  // TroGiangID?: Types.ObjectId;

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

  // @IsOptional()
  // @IsArray()
  // SinhVienDangKy?: Types.ObjectId[];

  // @IsOptional()
  // @IsArray()
  // TaiLieu?: Array<{ TenTaiLieu: string; LinkTaiLieu: string }>;

  // @IsOptional()
  // NgayCapNhat?: Date;
}

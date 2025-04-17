import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddCourseDto {
  @IsNotEmpty()
  @IsString()
  TenKhoaHoc: string;

  @IsNotEmpty()
  @IsString()
  GiangVienID: Types.ObjectId;

  @IsNotEmpty()
  @IsInt()
  SoTinChi: number;

  @IsOptional()
  @IsString()
  MoTa?: string;

  @IsInt()
  @IsNotEmpty()
  SoLuongToiDa: number;

  @IsNotEmpty()
  HanDangKy: Date;

  @IsNotEmpty()
  NgayBatDau: Date;

  @IsNotEmpty()
  NgayKetThuc: Date;

  @IsNotEmpty()
  @IsString()
  KhoaID: string;
  // @IsArray()
  // SinhVienDangKy: Types.ObjectId[];

  // @IsArray()
  // TaiLieu: Array<{ TenTaiLieu: string; LinkTaiLieu: string }>;

  // @IsOptional()
  // NgayCapNhat?: Date;
}

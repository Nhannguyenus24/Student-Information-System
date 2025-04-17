import { IsString, IsEnum, IsNotEmpty, IsOptional, IsDate, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateThongBaoDto {
  @IsString()
  @IsNotEmpty()
  TenThongBao: string;

  @IsString()
  @IsNotEmpty()
  NoiDung: string;

  @IsEnum(['GiangVien', 'SinhVien', 'Khoa', 'KhoaHoc', 'NienKhoa'])
  @IsNotEmpty()
  NhomGui: 'GiangVien' | 'SinhVien' | 'Khoa' | 'KhoaHoc' | 'NienKhoa';

  @IsOptional()
  KhoaHocID?: Types.ObjectId;

  @IsOptional()
  KhoaID?: Types.ObjectId;

  @IsOptional()
  Khoa?: string;
}

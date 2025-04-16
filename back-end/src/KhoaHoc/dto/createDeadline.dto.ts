import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDeadlineDto {
  @IsNotEmpty()
  @IsString()
  MoTa: string;

  @IsNotEmpty()
  @IsDateString()
  NgayBatDau: string;

  @IsNotEmpty()
  @IsDateString()
  NgayHetHan: string;
}
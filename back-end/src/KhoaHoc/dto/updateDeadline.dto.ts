import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateDeadlineDto {
  @IsOptional()
  @IsString()
  MoTa?: string;

  @IsOptional()
  @IsDateString()
  NgayBatDau?: string;

  @IsOptional()
  @IsDateString()
  NgayHetHan?: string;
}
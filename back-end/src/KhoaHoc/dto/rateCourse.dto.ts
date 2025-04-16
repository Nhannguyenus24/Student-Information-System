import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class RateCourseDto {
  @IsInt()
  @Min(0)
  @Max(5)
  SoSao: number;

  @IsString()
  @IsOptional()
  DanhGia?: string;
}
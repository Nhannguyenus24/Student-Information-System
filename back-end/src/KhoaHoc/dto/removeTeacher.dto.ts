import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveTeacherDto {
  @IsNotEmpty()
  @IsString()
  MaGV: string;
}
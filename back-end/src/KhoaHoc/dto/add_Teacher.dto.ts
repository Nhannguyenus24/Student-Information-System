import { IsString, IsNotEmpty } from 'class-validator';

export class AddTeacherintoCourseDto {
  @IsNotEmpty()
  @IsString()
  MaGV: string;
}

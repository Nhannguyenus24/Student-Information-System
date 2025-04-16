import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitAssignmentDto {
  @IsNotEmpty()
  @IsString()
  khoaHocId: string;

  @IsNotEmpty()
  @IsString()
  deadlineId: string;
}
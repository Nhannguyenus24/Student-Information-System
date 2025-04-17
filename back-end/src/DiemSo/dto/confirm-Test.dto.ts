import { IsBoolean, IsOptional } from 'class-validator';

export class ConfirmTestDto {
  @IsBoolean()
  isAttempt: boolean;

  @IsOptional()
  startTime?: Date;
}

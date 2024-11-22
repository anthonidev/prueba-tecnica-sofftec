import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class FusionDto {
  @IsInt()
  @IsPositive()
  planetId: number;

  @IsString()
  @MinLength(1)
  city: string;
}

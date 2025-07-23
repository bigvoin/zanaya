import { ApiProperty } from '@nestjs/swagger';

export class CreatePointsDto {
  @ApiProperty()
  studentId: string;

  @ApiProperty({ example: 'Helped a classmate' })
  reason: string;

  @ApiProperty({ example: 1, description: 'Positive or negative point value' })
  value: number;
}

export class PointsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  createdAt: Date;
}

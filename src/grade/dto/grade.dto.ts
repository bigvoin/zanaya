import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeDto {
  @ApiProperty()
  studentId: string;

  @ApiProperty()
  classId: string;

  @ApiProperty({ example: 'Math' })
  subject: string;

  @ApiProperty({ example: 88.5 })
  score: number;
}

export class GradeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  classId: string;
}

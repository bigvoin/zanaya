import { ApiProperty } from '@nestjs/swagger';

export class ClassroomDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teacherId: string;
}

export class CreateClassroomDto {
  @ApiProperty({ example: 'Math Level 1' })
  name: string;
}

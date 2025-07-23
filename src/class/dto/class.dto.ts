import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  classroomId: string;
}

export class ClassDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  classroomId: string;
}
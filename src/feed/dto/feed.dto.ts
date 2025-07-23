import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Class trip announcement' })
  content: string;
}

export class PostDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  teacherId: string;

  @ApiProperty()
  createdAt: Date;
}
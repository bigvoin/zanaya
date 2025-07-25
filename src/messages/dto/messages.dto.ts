import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const SendMessageSchema = z.object({
  recipientId: z.uuid(),
  content: z.string().min(1).max(1000),
});

export class SendMessageDto {
  @ApiProperty()
  recipientId: string;

  @ApiProperty({ example: 'Hey there! 👋' })
  content: string;
}

export class MessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;
}

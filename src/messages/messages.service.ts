// src/message/message.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto, SendMessageDto } from './dto/messages.dto'; 

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(senderId: string, dto: SendMessageDto): Promise<MessageDto> {
    const recipient = await this.prisma.user.findUnique({ where: { id: dto.recipientId } });
    if (!recipient) {
      throw new NotFoundException('Recipient not found');
    }

    return this.prisma.message.create({
      data: {
        senderId,
        recipientId: dto.recipientId,
        content: dto.content,
      },
    });
  }

  async getConversation(userId: string, otherUserId: string): Promise<MessageDto[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId: otherUserId },
          { senderId: otherUserId, recipientId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getInbox(userId: string): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId },
                { recipientId: userId },
            ],
        },
        orderBy: { createdAt: 'desc' },
    });

    const uniqueConversations = new Map<string, MessageDto>();

    for (const msg of messages) {
        const key = [msg.senderId, msg.recipientId].sort().join('-');
        if (!uniqueConversations.has(key)) {
            uniqueConversations.set(key, msg);
        }
    }

    return Array.from(uniqueConversations.values());
    }
}

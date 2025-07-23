// src/feed/feed.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto, CreatePostDto } from './dto/feed.dto';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePostDto): Promise<PostDto> {
    const teacher = await this.prisma.teacher.findUnique({ where: { id: userId } });
    if (!teacher) {
      throw new ForbiddenException('Only teachers can create posts');
    }

    return this.prisma.post.create({
      data: {
        content: dto.content,
        teacherId: userId,
      },
    });
  }

  async findAll(teacherId?: string): Promise<PostDto[]> {
    return this.prisma.post.findMany({
      where: teacherId ? { teacherId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }
}

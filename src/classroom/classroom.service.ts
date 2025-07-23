// src/classroom/classroom.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/classroom.dto';
import { ClassroomDto } from './dto/classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(teacherId: string, dto: CreateClassroomDto): Promise<ClassroomDto> {
    const teacher = await this.prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) throw new ForbiddenException('Only teachers can create classrooms');

    const classroom = await this.prisma.classroom.create({
      data: {
        name: dto.name,
        teacherId,
      },
    });

    return classroom;
  }

  async findAll(teacherId?: string): Promise<ClassroomDto[]> {
    return this.prisma.classroom.findMany({
      where: teacherId ? { teacherId } : undefined,
    });
  }

  async findOne(id: string): Promise<ClassroomDto> {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return classroom;
  }
}

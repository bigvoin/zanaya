import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClassDto, CreateClassDto } from './dto/class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateClassDto): Promise<ClassDto> {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: dto.classroomId },
    });

    if (!classroom || classroom.teacherId !== userId) {
      throw new ForbiddenException('You are not authorized to add a class to this classroom');
    }

    return this.prisma.class.create({
      data: {
        name: dto.name,
        classroomId: dto.classroomId,
      },
    });
  }

  async findAll(classroomId?: string): Promise<ClassDto[]> {
    return this.prisma.class.findMany({
      where: classroomId ? { classroomId } : undefined,
    });
  }

  async findOne(id: string): Promise<ClassDto> {
    const classEntity = await this.prisma.class.findUnique({ where: { id } });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    return classEntity;
  }
}

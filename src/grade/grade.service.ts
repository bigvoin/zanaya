import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GradeDto, CreateGradeDto } from './dto/grade.dto';

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  async assignGrade(teacherId: string, dto: CreateGradeDto): Promise<GradeDto> {
    const classData = await this.prisma.class.findUnique({
      where: { id: dto.classId },
      include: { classroom: true },
    });
    if (!classData) {
      throw new BadRequestException('Class not found');
    }

    if (classData.classroom.teacherId !== teacherId) {
      throw new ForbiddenException('You are not authorized to grade this class');
    }

    return this.prisma.grade.create({
      data: {
        subject: dto.subject,
        score: dto.score,
        studentId: dto.studentId,
        classId: dto.classId,
      },
    });
  }

  async getStudentGrades(studentId: string): Promise<GradeDto[]> {
    return this.prisma.grade.findMany({
      where: { studentId },
      orderBy: { subject: 'asc' },
    });
  }
}

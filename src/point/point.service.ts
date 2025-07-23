import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PointsDto, CreatePointsDto } from './dto/points.dto';

@Injectable()
export class PointsService {
  constructor(private readonly prisma: PrismaService) {}

  async givePoint(teacherId: string, dto: CreatePointsDto): Promise<PointsDto> {
    const teacher = await this.prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) {
      throw new ForbiddenException('Only teachers can assign behavior points');
    }

    return this.prisma.behaviorPoint.create({
      data: {
        reason: dto.reason,
        value: dto.value,
        studentId: dto.studentId,
      },
    });
  }

  async getPointsForStudent(studentId: string): Promise<PointsDto[]> {
    return this.prisma.behaviorPoint.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

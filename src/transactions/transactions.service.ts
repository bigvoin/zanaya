// src/transaction/transaction.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionDto, CreateTransactionDto } from './dto/transactions.dto'; 

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(teacherId: string, dto: CreateTransactionDto): Promise<TransactionDto> {
    const teacher = await this.prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) {
      throw new ForbiddenException('Only teachers can create transactions');
    }

    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        type: dto.type,
        studentId: dto.studentId,
      },
    });
  }

  async getStudentTransactions(studentId: string): Promise<TransactionDto[]> {
    return this.prisma.transaction.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

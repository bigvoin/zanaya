import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth-guard/jwt-auth-guard.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
import { Roles } from 'src/common/decorators/roles.decorator'; 
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type'; 
import { TransactionService } from './transactions.service'; 
import { TransactionDto, CreateTransactionDto } from './dto/transactions.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.leader)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: TransactionDto })
  async create(
    @Body() dto: CreateTransactionDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<TransactionDto> {
    return this.transactionService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.parent, Role.leader)
  @ApiBearerAuth()
  @Get('student/:id')
  @ApiOkResponse({ type: [TransactionDto] })
  async getStudentTransactions(@Param('id') studentId: string): Promise<TransactionDto[]> {
    return this.transactionService.getStudentTransactions(studentId);
  }
}

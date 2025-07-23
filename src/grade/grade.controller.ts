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
import { GradeService } from './grade.service';
import { GradeDto, CreateGradeDto } from './dto/grade.dto';

@ApiTags('grades')
@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: GradeDto })
  async assignGrade(
    @Body() dto: CreateGradeDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<GradeDto> {
    return this.gradeService.assignGrade(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.parent, Role.leader)
  @ApiBearerAuth()
  @Get('student/:id')
  @ApiOkResponse({ type: [GradeDto] })
  async getStudentGrades(@Param('id') studentId: string): Promise<GradeDto[]> {
    return this.gradeService.getStudentGrades(studentId);
  }
}

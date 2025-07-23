// src/behavior/behavior.controller.ts
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
import { PointsService } from './point.service';
import { PointsDto, CreatePointsDto } from './dto/points.dto';

@ApiTags('points')
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: PointsDto })
  async givePoint(
    @Body() dto: CreatePointsDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PointsDto> {
    return this.pointsService.givePoint(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.parent, Role.leader)
  @ApiBearerAuth()
  @Get('student/:id')
  @ApiOkResponse({ type: [PointsDto] })
  async getPoints(@Param('id') studentId: string): Promise<PointsDto[]> {
    return this.pointsService.getPointsForStudent(studentId);
  }
}

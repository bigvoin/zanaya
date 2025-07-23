// src/classroom/classroom.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth-guard/jwt-auth-guard.guard';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/classroom.dto';
import { ClassroomDto } from './dto/classroom.dto'; 
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 

@ApiTags('classrooms')
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: ClassroomDto })
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateClassroomDto,
  ): Promise<ClassroomDto> {
    return this.classroomService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher, Role.leader)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: [ClassroomDto] })
  async findAll(@Query('teacherId') teacherId?: string): Promise<ClassroomDto[]> {
    return this.classroomService.findAll(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: ClassroomDto })
  async findOne(@Param('id') id: string): Promise<ClassroomDto> {
    return this.classroomService.findOne(id);
  }
}

// src/class/class.controller.ts
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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator'; 
import { Role } from '@prisma/client';
import { ClassService } from './class.service';
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type';
import { ClassDto, CreateClassDto } from './dto/class.dto';

@ApiTags('classes')
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: ClassDto })
  async create(
    @Body() dto: CreateClassDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ClassDto> {
    return this.classService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: [ClassDto] })
  async findAll(@Query('classroomId') classroomId?: string): Promise<ClassDto[]> {
    return this.classService.findAll(classroomId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: ClassDto })
  async findOne(@Param('id') id: string): Promise<ClassDto> {
    return this.classService.findOne(id);
  }
}

// src/post/post.controller.ts
import {
  Body,
  Controller,
  Get,
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
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type';
import { FeedService } from './feed.service';
import { PostDto, CreatePostDto } from './dto/feed.dto';

@ApiTags('posts')
@Controller('posts')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.teacher)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: PostDto })
  async create(
    @Body() dto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostDto> {
    return this.feedService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: [PostDto] })
  async findAll(@Query('teacherId') teacherId?: string): Promise<PostDto[]> {
    return this.feedService.findAll(teacherId);
  }
}

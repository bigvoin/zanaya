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
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type';
import { MessageService } from './messages.service';
import { MessageDto, SendMessageDto } from './dto/messages.dto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: MessageDto })
  async sendMessage(
    @Req() req: AuthenticatedRequest,
    @Body() dto: SendMessageDto,
  ): Promise<MessageDto> {
    return this.messageService.sendMessage(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('conversation/:userId')
  @ApiOkResponse({ type: [MessageDto] })
  async getConversation(
    @Req() req: AuthenticatedRequest,
    @Param('userId') otherUserId: string,
  ): Promise<MessageDto[]> {
    return this.messageService.getConversation(req.user.userId, otherUserId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('inbox')
  @ApiOkResponse({ type: [MessageDto] })
  async getInbox(@Req() req: AuthenticatedRequest): Promise<MessageDto[]> {
    return this.messageService.getInbox(req.user.userId);
  }
}

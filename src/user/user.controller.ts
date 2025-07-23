import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/jwt-auth-guard/jwt-auth-guard.guard';
import { AuthenticatedRequest } from 'src/common/types/AuthRequest.type';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOkResponse({ type: UserDto, description: 'Get current user details' })
  async getMe(@Req() req: AuthenticatedRequest): Promise<UserDto | null> {
    const userId = req.user['userId'];
    if (!userId) 
      throw new Error('User ID not found in request');

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
}
// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SignupSchema,
  LoginDto,
  LoginSchema,
} from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(SignupSchema))
  @ApiBody({ type: SignupDto })
  @ApiOkResponse({ description: 'User signed up and JWT token returned' })
  async signup(@Body() body: SignupDto): Promise<{ access_token: string }> {
    return await this.authService.signup(body);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'User logged in and JWT token returned' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}

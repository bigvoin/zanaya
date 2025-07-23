import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { Role } from '@prisma/client';

export const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(Role),
});

export class SignupDto {
  @ApiProperty({ example: 'leader@example.com' })
  email: string;

  @ApiProperty({ example: 'strongpassword' })
  password: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: Role.leader, enum: Role })
  role: Role;
}

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export class LoginDto {
  @ApiProperty({ example: 'leader@example.com' })
  email: string;

  @ApiProperty({ example: 'strongpassword' })
  password: string;
}

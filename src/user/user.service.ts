import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { User } from '@prisma/client';
import { SignupDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser({
    email,
    password,
    firstName,
    lastName,
    role,
  } : SignupDto
): Promise<UserDto> {
  if(await this.findByEmail(email)) 
    throw new ConflictException('A user with this email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const roleData = (() => {
    switch (role) {
      case Role.student:
        return { student: { create: {} } };
      case Role.teacher:
        return { teacher: { create: {} } };
      case Role.parent:
        return { parent: { create: {} } };
      case Role.leader:
        return { leader: { create: {} } };
      default:
        throw new Error(`Unsupported role: ${role}`);
    }
  })();

const user = await this.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      ...roleData,
    },
    include: {
      sentMessages: true,
      receivedMessages: true,
    },
  });

  const { password: _, ...safeUser } = user;

  return safeUser;
}
}

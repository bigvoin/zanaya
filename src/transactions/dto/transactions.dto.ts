import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  studentId: string;

  @ApiProperty({ example: 10.0 })
  amount: number;

  @ApiProperty({ example: 'reward', description: 'Type: reward, penalty, purchase' })
  type: string;
}

export class TransactionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  createdAt: Date;
}
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { PointModule } from './point/point.module';
import { FeedModule } from './feed/feed.module';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ClassroomModule } from './classroom/classroom.module';
import { GradeModule } from './grade/grade.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MessageModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClassModule,
    PointModule,
    FeedModule,
    ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ClassroomModule,
    GradeModule,
    TransactionsModule,
    MessageModule,
  ],
})
export class AppModule {}

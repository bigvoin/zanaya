import { Module } from '@nestjs/common';
import { PointsController } from './point.controller';
import { PointsService } from './point.service';

@Module({
  controllers: [PointsController],
  providers: [PointsService]
})
export class PointModule {}

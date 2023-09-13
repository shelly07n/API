import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Attendance } from './entities/attendance.entity';

@Module({
  imports:[SequelizeModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService,{ provide: "SEQUELIZE", useExisting: Sequelize }],
  exports: [SequelizeModule],
})
export class AttendanceModule {}

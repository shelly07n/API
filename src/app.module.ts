import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceModule } from './attendance/attendance.module';
import config from 'config/db_config';




@Module({
  imports: [
    SequelizeModule.forRoot(config),
    ScheduleModule.forRoot(),
    UsersModule,
    EmployeeModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

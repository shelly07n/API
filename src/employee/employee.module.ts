import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Employee } from './entities/employee.entity';

@Module({
  imports:[SequelizeModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService,{ provide: "SEQUELIZE", useExisting: Sequelize }],
  exports: [SequelizeModule],
})
export class EmployeeModule {}

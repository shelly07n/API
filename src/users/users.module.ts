import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from "sequelize-typescript";
import { User } from './entities/user.entity';


@Module({
  imports: [SequelizeModule.forFeature([User]),],
  controllers: [UsersController],
  providers: [UsersService,Logger, { provide: "SEQUELIZE", useExisting: Sequelize }],
  exports: [SequelizeModule],

})
export class UsersModule { }

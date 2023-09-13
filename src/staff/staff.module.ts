import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Staff } from './entities/staff.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[SequelizeModule.forFeature([Staff]),
  MulterModule.registerAsync({
    useFactory: () => ({
        dest: '../../dist/src/staff/upload',
        storage: diskStorage({
            filename: (_, file, callback) => {
                callback(null, `${Date.now()}${file.originalname}`);
            },
        }),
    }),
}),],
  controllers: [StaffController],
  providers: [StaffService,{ provide: "SEQUELIZE", useExisting: Sequelize }],
  exports: [SequelizeModule],

})
export class StaffModule {}

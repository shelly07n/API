import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    return await this.staffService.create(createStaffDto);
  }

  @Get()
  async findAll(): Promise<Array<Staff>> {
    return await this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Staff> {
    return await this.staffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }

  @Post("file")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: '../../dist/src/staff/upload',
        filename: (_, file, callback) => {
          callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  uploadFileAndPassValidation(
    @Body()
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(ImportStaffDto.importData);

    return this.staffService.importStaff(file);
  }
}

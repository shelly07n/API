import { Inject, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Sequelize } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './entities/staff.entity';
import { WorkBook, WorkSheet, utils, write, read, stream } from "xlsx";
import { createReadStream } from "fs";
import { join } from 'path';


@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff)
    private readonly staffModel: typeof Staff,

    @Inject("SEQUELIZE")
    private sequelize: Sequelize,

  ) { }

  path = '../../dist/src/staff/upload'

  async create(createStaffDto: CreateStaffDto): Promise<Staff | undefined> {
    try {
      const staff = await this.staffModel.create({ ...createStaffDto });
      return staff;
    }
    catch (error) {
      console.log("🚀 ~ file: staff.service.ts ~ StaffService ~ create ~ error", error);
    }
  }

  findAll() {
    return this.staffModel.findAll()
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id);
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    try {
      const staff = await this.staffModel.update(updateStaffDto, { where: { id }, returning: true });
      return staff[1];
    } catch (error) {
      console.log("🚀 ~ file: staff.service.ts ~ StaffsService ~ update ~ error", error);
      throw new Error("Error updating staff");
    }
  }

  async remove(id: number) {
    const staff = await this.staffModel.findByPk(id);
    staff.isDeleted = true;
    staff.deletedAt = new Date();
    await staff.save();
  }

  async importStaff(uploadFile: Express.Multer.File): Promise<void> {

    const workbook: WorkBook = await new Promise((resolve, reject) => {
      const stream = createReadStream(join(this.path, uploadFile.filename))
      const buffers = [];
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => {
        const buffer = Buffer.concat(buffers);
        resolve(read(buffer, { type: "buffer" }));
      });
      stream.on("error", (error) => reject(error));
    });


    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = utils.decode_range(sheet["!ref"]);
    const staffList = [];

    // console.log(sheet);


    for (let rowNum = range.s.r; rowNum <= range.e.r; ++rowNum) {
      if (rowNum === 0 || !this.getCellValueFor(sheet, 0, rowNum)) {
        continue;
      }
      let colNum = 0;

      const entity = {
        firstName: this.getCellValueFor(sheet, colNum++, rowNum),
        lastName: this.getCellValueFor(sheet, colNum++, rowNum),
        designation: this.getCellValueFor(sheet, colNum++, rowNum),
        doj: this.getCellValueFor(sheet, colNum++, rowNum),
        department: this.getCellValueFor(sheet, colNum++, rowNum),
        email: this.getCellValueFor(sheet, colNum++, rowNum),
        mobileNumber: this.getCellValueFor(sheet, colNum++, rowNum),
      };
        // const fullName = `${entity.firstName} ${entity.lastName}`;
        // if (entity.email) {
        //   const isToExist = entity.email != '' ? entity.email : '';
        //   const isLinkExist = 'demo.abserp.in';
        //   const isSubjectExist = 'Welcome to abserp Confirm Your Email';
        //   await this.mailerService.sendMail({
        //     to: entity.email,
        //     subject: isSubjectExist,
        //     template: 'mail_staff_welcome',
        //     context: {
        //       isLinkExist, verificationCode, fullName
        //     },
        //   });
        // }

        staffList.push(entity);
    }

    if (staffList.length === 0) {
      return;
    }
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t }
      await this.staffModel.bulkCreate(staffList, transactionHost);
    });


  }

  getCellValueFor(sheet: WorkSheet, colNumber: number, rowNumber: number): string {
    return sheet[utils.encode_cell({ c: colNumber, r: rowNumber })]?.v ?? "";
  }

}

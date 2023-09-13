/* eslint-disable prettier/prettier */
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
@Table({ tableName: "Attendance" })
export class Attendance  extends Model<InferCreationAttributes<Attendance>, InferAttributes<Attendance>> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    employeeId: string;

    @Column
    date:Date;
    
    @Column
    checkin: Date;

    @Column
    checkout: Date;

    @Column
    attendanceMode: string;

    @Column({ defaultValue: false })
    isDeleted: boolean;

    @Column
    deletedAt: Date;
}

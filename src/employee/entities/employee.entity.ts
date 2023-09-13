/* eslint-disable prettier/prettier */
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
@Table({ tableName: "Employee" })
export class Employee  extends Model<InferCreationAttributes<Employee>, InferAttributes<Employee>> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    employeeId: string;

    @Column
    departments: string;

    @Column({ defaultValue: "Active" }) // 'active' field with default value true (active)
    status: string;

    @Column
    email: string;
    @Column
    facebookID: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    linkedInID: string;

    @Column
    confirmpassword: string;

    @Column
    newPassword: string;

    @Column
    password: string;

    @Column
    phone: string;

    @Column
    country: string;

    @Column
    state: string;

    @Column
    city: string;

    @Column
    verificationCode: number;

    @Column({ defaultValue: false })
    isDeleted: boolean;

    @Column
    deletedAt: Date;
}

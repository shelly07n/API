import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
@Table({ tableName: "Staff" })
export class Staff extends Model<InferCreationAttributes<Staff>, InferAttributes<Staff>>  {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    firstname: string;

    @Column
    lastname: string;

    @Column
    designation: string;

    @Column({ defaultValue: "Active" }) // 'active' field with default value true (active)
    status: string;

    @Column
    email: string;

    @Column
    department: string;

    @Column
    doj: Date;

    @Column
    mobileNumber: number;

    @Column({ defaultValue: false })
    isDeleted: boolean;

    @Column
    deletedAt: Date;

}

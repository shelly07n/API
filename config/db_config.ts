import { SequelizeModuleOptions } from "@nestjs/sequelize";

const config: SequelizeModuleOptions = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "nest_testing",
    autoLoadModels: true,
    synchronize: true,
    sync: { alter: true }, // Remove this for production
};

export default config;
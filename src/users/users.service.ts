import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject("SEQUELIZE")
    private readonly sequelize: Sequelize,
    private readonly logger: Logger,

  ) { }

  async create(createUserDto: CreateUserDto):Promise<User> {
    try {
      console.log(createUserDto);
      return this.userModel.create(createUserDto);
  } catch (error) {
      this.logger.error("🚀 ~ file: user.service.ts ~ UserService ~ create ~ error", error);
      throw new Error("Error creating UserService");
  }
  }

   findAll(): Promise<User[]> {
    try {
      return this.userModel.findAll();
  } catch (error) {
      this.logger.error("🚀 ~ file: user.service.ts ~ UserService ~ create ~ error", error);
      throw new Error("Error creating UserService");
  }
  }

  async getUser(options?: object): Promise<any> {
    return this.userModel.findOne(options)

  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Array<User>> {
    try {
      const lead = await this.userModel.update(updateUserDto, { where: { id }, returning: true });
      return lead[1];
  } catch (error) {
    this.logger.error("🚀 ~ file: user.service.ts ~ UserService ~ create ~ error", error);
    throw new Error("Error creating UserService");
  }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

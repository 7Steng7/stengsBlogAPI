import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { PasswordService } from '../common/services/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  //Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  //Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find one user by ID
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
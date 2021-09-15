import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    await this.userRepository.update(dto, {
      where: { id: id },
    });
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async removeUser(id: string) {
    await this.userRepository.destroy({
      where: { id: id },
    });
    const users = await this.userRepository.findAll();
    return users;
  }
}

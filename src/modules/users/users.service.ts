import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    await this.findUniqueEmail(createUserDto.email);
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
    });
    await this.prisma.user.create({ data: { ...user } });
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.findUserOrError(id);
    return plainToInstance(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findUserOrError(id);
    if (updateUserDto.email) await this.findUniqueEmail(updateUserDto.email);
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return plainToInstance(User, updateUser);
  }

  async remove(id: string) {
    await this.findUserOrError(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async findUserOrError(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findUniqueEmail(dtoEmail: string) {
    const findUser = await this.findByEmail(dtoEmail);
    if (findUser) throw new ConflictException('Email already exists');
  }
}

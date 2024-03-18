import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from 'src/dto/users/update-user.dto';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
;


@Injectable()
export class UsersService {
  private readonly filePath = './src/users/data.json';
  
  private users: CreateUserDto[] = [];

  findAll(): CreateUserDto[] {
    const allUsers = readFileSync(resolve(this.filePath))
    const users = JSON.parse(allUsers.toString('utf8'))
    if (users.length === 0) throw new NotFoundException('User not found');
    return users;
    // const allUser = this.users;
    // if (allUser.length === 0) throw new NotFoundException('User not found');
    // return allUser
  }

  findOne(id: string): CreateUserDto {
    const allUsers = readFileSync(resolve(this.filePath))
    const users = JSON.parse(allUsers.toString('utf8'))
    const index = users.findIndex((item: CreateUserDto) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    } else {
      return users[index];
    }
    // const user = this.users.find(user => user.id === id);
    // if (!user) throw new NotFoundException('User not found');
    // return user
  }

  create(createUserDto: CreateUserDto): CreateUserDto {
    createUserDto.id = uuidv4();
    const allUsers = readFileSync(resolve(this.filePath))
    const users = JSON.parse(allUsers.toString('utf8'))
    users.push(createUserDto);
    writeFileSync(this.filePath, JSON.stringify(users, null, 2))
    return createUserDto;
    // this.users.push(createUserDto);
    // return createUserDto;
  }

  update(id: string, updateUserDto: UpdateUserDto): UpdateUserDto {
    const allUsers = readFileSync(resolve(this.filePath))
    const users = JSON.parse(allUsers.toString('utf8'))
    const index = users.findIndex((user) => {
      return user.id === id;
    });
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    users[index] = { ...users[index], ...updateUserDto };
    writeFileSync(this.filePath, JSON.stringify(users, null, 2));
    return users[index];
    // const index = this.users.findIndex((user) => {
    //   return user.id === id
    // });
    // this.users[index] = { ...this.users[index], ...updateUserDto };
    // return this.users[index];
  }

  remove(id: string){
    const allUsers = readFileSync(resolve(this.filePath))
    const users = JSON.parse(allUsers.toString('utf8'))
    const index = users.findIndex((item: CreateUserDto) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    } else {
      users.splice(index, 1);
      writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      return { message: 'User Successfully deleted', statusCode: 200};
    }
    // this.users = this.users.filter(user => user.id !== id);
  }
}

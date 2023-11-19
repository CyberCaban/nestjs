import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

type IUser = {
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
};

type IUserOptional = {
  name?: string;
  email?: string;
  role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
};

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get() // get /users or /users?role=value&age=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.UsersService.findAll(role);
  }

  @Get(':id') // get /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.findOne(id);
  }

  @Post() // post /users
  create(@Body() user: IUser) {
    return this.UsersService.create(user);
  }

  @Patch(':id') // patch /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: IUserOptional,
  ) {
    return this.UsersService.update(id, userUpdate);
  }

  @Delete(':id') // delete /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.delete(id);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    async getAll() {
        const data = await this.userService.getAll();

        return {
            users: data
        }
    }

    @Get(':id')
    async getOne(
        @Param('id') id: number
    ) {
        const data = await this.userService.getOne(id);
        return {data}
    }

    @Post()
    async crateone(
        @Body() dto: CreateUserDto
    ) {
        const data = await this.userService.createOne(dto);
        return {
            messge: 'User Created',
            data
        }
    }

    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto
    ) {
        const data = await this.userService.editOne(id, dto);
        return {
             message: 'Usuario editado con éxito',
             data
        }
    }

    @Delete(':id')
    async deleteOne(
        @Param('id') id: number
    ) { 
        const data = await this.userService.deleteOne(id);
        return {
            message: 'Usuario eliminado con éxito',
             data
        }
    }
}


//Continuar desde el 1:09:14
// https://www.youtube.com/watch?v=lTmGLgtgjdM
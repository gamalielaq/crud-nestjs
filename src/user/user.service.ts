import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos';


export interface UserFindOne {
    id?: number;
    email?: string;
}

@Injectable()
export class UserService {

    constructor( 
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getAll() {
       return await this.userRepository.find();
    }
    
    async getOne(  id: number ) {
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException('No existe usurios con ese identificador');
        return user;
    }
    
    async createOne( dto: CreateUserDto ) {
        const userExist = await this.userRepository.findOne({email: dto.email}); //Filtro por email

        if(userExist) throw new BadRequestException('Usuario ya existe registrado con este email');

        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);
        delete user.password;
        return user;

    }
    
    async editOne(id: number, dto: EditUserDto) {
        const user = await this.getOne(id);
        const editUser = Object.assign(user, dto);
        return await this.userRepository.save(editUser);
    }

    async deleteOne(id: number) {
        const user = await this.getOne(id);
        return await this.userRepository.remove(user);
    }

    async findOne(data: UserFindOne) {
        return await this.userRepository
        .createQueryBuilder('user')
        .where(data)
        .addSelect('user.password')
        .getOne()
    }
}

import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser( email: string, password: string): Promise<any> {
        const user = await this.userService.findOne({email});

        if(user && await compare(password, user.password)) {
            const  { password, ...rest } = user;
            return rest;
        }

        return null;
    }


    login(user: User) {
        const { id, ...rest } = user;
        const payload = { sub: id };
        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }
}

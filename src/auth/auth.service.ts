import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }

    async validateUser( email: string, password: string): Promise<any> {
        const user = await this.userService.findOne({email});

        if(user && await compare(password, user.password)) {
            return user;
        }

        return null;
    }
}

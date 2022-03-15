import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User as UserEntity } from './../user/entities/user.entity';
import { User } from 'src/common/decorators';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @User() user: UserEntity,
    ) {
        return user;
    }

    @Get('profile')
    profile() {
        return 'Estos son tus datos'
    }
}
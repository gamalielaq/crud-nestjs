import { JwtAuthGuard } from './guards';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User as UserEntity } from './../user/entities/user.entity';
import { User, Auth } from 'src/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Routs')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @User() user: UserEntity,
    ) {
        const data = await this.authService.login(user);
        return {
            message: 'Login Exitoso',
            data
        };
    }


    // @UseGuards(JwtAuthGuard)
    @Auth()
    @Post('refresh-token')
    async refreshToken(
        @User() user: UserEntity,
    ) {
        const data = await this.authService.login(user);
        return {
            message: 'Refresh Exitoso',
            data
        };
    }


    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    @Auth()
    @Get('profile')
    profile(
        @User() user: UserEntity
    ) {
        return {
            message: 'Petición Correcta',
            user
        }
    }
}
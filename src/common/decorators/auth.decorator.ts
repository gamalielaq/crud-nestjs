import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators, UseGuards } from "@nestjs/common";

export function Auth() {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth()
    )
}
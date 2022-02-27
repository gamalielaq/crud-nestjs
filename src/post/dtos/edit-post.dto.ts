import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

// PartialType: -> todos mis campos de CreatePostDto que son obligatorios, PartialType los tranformó  opcionales
export class EditPostDto extends PartialType(
    OmitType(CreatePostDto, ['slug'] as const ) ) {
}
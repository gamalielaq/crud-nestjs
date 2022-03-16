import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { EditPostDto } from './dtos/edit-post.dto';
import { CreatePostDto } from './dtos/create-post.dto';

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Auth } from 'src/common/decorators';

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) { }

    @Get()
    getMany() {
        return this.postService.getMany();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getOne(id);
    }

    @Auth()
    @Post()
    createOne(
        @Body() dto: CreatePostDto,
    ) {
        return this.postService.createOne(dto);
    }

    @Auth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPostDto
    ) {
        return this.postService.editOne(id, dto);
    }

    @Auth()
    @Delete(':id')
    deleteOne(
        @Param('id') id: number,
    ) {
        return this.postService.deleteOne(id);
    }
}
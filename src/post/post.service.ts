import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostDto } from './dtos/edit-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private readonly postRespository: Repository<Post>
    ) { }

    async getMany() {
        const data = await this.postRespository.find();
        return {
            message: 'Ok',
            data
        }
    }

    async getOne(id: number) {
        const data = await this.postRespository.findOne(id);
        if(!data) throw new NotFoundException();
        return {
            message: 'Ok',
            code: 0,
            data
        }
    }

    async createOne(dto: CreatePostDto) {
        const post = this.postRespository.create( dto as any );
        return await this.postRespository.save(post);
    }

    async editOne(id: number, dto: EditPostDto) {

        const data = await this.postRespository.findOne(id);

        if(!data) throw new NotFoundException('Post does not exist')

        const editedPost = Object.assign(data, dto);
        return await this.postRespository.save(editedPost);
    }
   
    deleteOne(id: number) {
        return this.postRespository.delete(id);
    }
}

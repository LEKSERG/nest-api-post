import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { postEntity } from './post.entity';

@Injectable()
export class postService {
  constructor(
    @InjectRepository(postEntity)
    private postRepository: Repository<postEntity>,
  ) {}

  async read(id: string): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return post;
  }

  async create(data: any): Promise<any> {
    const post = await this.postRepository.create(data);

    await this.postRepository.save(post);

    return post;
  }

  async update(id: string, data: Partial<any>): Promise<any> {
    let post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.postRepository.update({ id }, data);

    post = await this.postRepository.findOne({ where: { id } });

    return post;
  }

  async destroy(id: string): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.postRepository.remove(post);
    return post;
  }
}

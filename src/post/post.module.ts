import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { postController } from './post.controller';
import { postEntity } from './post.entity';
import { postService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([postEntity])],
  controllers: [postController],
  providers: [postService],
})
export class postModule {}

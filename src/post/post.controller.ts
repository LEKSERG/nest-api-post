import redis from 'redis';
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { postService } from './post.service';

const client = redis.createClient();
@Controller('api/posts')
export class postController {
  constructor(private postService: postService) {}

  @Post()
  createpost(@Body() body: any) {
    return this.postService.create(body);
  }

  @Get(':id')
  readpost(@Param('id') id: string) {
    const cached = client.get(id);
    if (cached) {
      return cached;
    } else {
      const post = this.postService.read(id);
      client.set(id, post);
    }
  }

  @Put(':id')
  updatepost(@Param('id') id: string, @Body() body: Partial<any>) {
    return this.postService.update(id, body);
  }

  @Delete(':id')
  destroypost(@Param('id') id: string) {
    return this.postService.destroy(id);
  }
}

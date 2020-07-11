import { Module } from '@nestjs/common';
import { postModule } from './post/post.module';

@Module({
  imports: [postModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

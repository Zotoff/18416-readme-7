import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { LikeController } from './like.controller';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
    LikeController,
    CommentsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}

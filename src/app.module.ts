import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.NAMEUSERDATABASE}:${process.env.PASSWORDDATABASE}@stengclusterblog.vgezi.mongodb.net/blog`,
    ),
    PostsModule,
    UsersModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
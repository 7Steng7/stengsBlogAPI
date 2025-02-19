import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAllPaginated(page: number, limit: number, sort: string): Promise<Post[]> {
    const skip = (page - 1) * limit;
    return this.postModel.find().sort(sort).skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).populate('author').exec();
  }

  async findByTags(tags: string[]): Promise<Post[]> {
    return this.postModel.find({ tags: { $in: tags } }).exec();
  }

  async getPopularPosts(): Promise<Post[]> {
    return this.postModel.find().sort({ views: -1 }).limit(5).exec();
  }
}
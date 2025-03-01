import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  //Create a new post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  //Find all posts
  async findAllPaginated(page: number, limit: number, sort: string): Promise<Post[]> {
    const skip = (page - 1) * limit;
    return this.postModel.find().sort(sort).skip(skip).limit(limit).exec();
  }

  // Find one post by ID
  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).populate('author').exec();
  }

  // Find posts by tag
  async findByTags(tags: string[]): Promise<Post[]> {
    return this.postModel.find({ tags: { $in: tags } }).exec();
  }

  // Filter popular posts
  async getPopularPosts(): Promise<Post[]> {
    return this.postModel.find().sort({ views: -1 }).limit(5).exec();
  }
}
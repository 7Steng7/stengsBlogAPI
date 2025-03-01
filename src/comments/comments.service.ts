import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  //Create a new comment
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }
  
  //Find all comments
  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  //Find a comment by ID
  async findOne(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  //Reply to a comment
  async replyToComment(commentId: string, reply: string): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply } },
      { new: true },
    ).exec();
    if (!updatedComment) {
      throw new Error('Comment not found');
    }
    return updatedComment;
  }
}
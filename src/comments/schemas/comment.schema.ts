import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@NestSchema({ timestamps: true })
export class Comment extends Document {
  @ApiProperty({ description: 'ID de la publicación', example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @Prop({ type: Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: string;

  @ApiProperty({ description: 'ID del usuario', example: '64a1b2c3d4e5f6a7b8c9d0e2' })
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @ApiProperty({ description: 'Contenido del comentario', example: '¡Excelente publicación!' })
  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
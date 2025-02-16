import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@NestSchema({ timestamps: true })
export class Post extends Document {
  @ApiProperty({ description: 'Título de la publicación', example: 'Mi primera publicación' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Contenido de la publicación', example: 'Este es el contenido de mi publicación.' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ description: 'ID del autor', example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  author: string;

  @ApiProperty({ description: 'Etiquetas de la publicación', example: ['nestjs', 'mongodb'], required: false })
  @Prop([String])
  tags: string[];

  @ApiProperty({ description: 'Estado de la publicación', example: false, required: false })
  @Prop({ default: false })
  published: boolean;

  @ApiProperty({ description: 'Número de vistas', example: 0, required: false })
  @Prop({ default: 0 })
  views: number;

  @ApiProperty({ description: 'Comentarios de la publicación', example: [], required: false })
  @Prop([{ type: Schema.Types.ObjectId, ref: 'Comment' }])
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
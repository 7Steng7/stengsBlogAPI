import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Título de la publicación', example: 'Mi primera publicación' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Contenido de la publicación', example: 'Este es el contenido de mi publicación.' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID del autor', example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsString()
  author: string;

  @ApiProperty({ description: 'Etiquetas de la publicación', example: ['nestjs', 'mongodb'], required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Estado de la publicación', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
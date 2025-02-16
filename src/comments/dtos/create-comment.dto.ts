import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'ID de la publicación', example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsString()
  postId: string;

  @ApiProperty({ description: 'ID del usuario', example: '64a1b2c3d4e5f6a7b8c9d0e2' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Contenido del comentario', example: '¡Excelente publicación!' })
  @IsString()
  content: string;
}
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('comments') // Etiqueta para agrupar los endpoints de comentarios
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Comentarios encontrados' })
  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado' })
  @ApiBody({ type: CreateCommentDto }) // Especifica el DTO para el cuerpo de la solicitud
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }
}
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Comentarios encontrados' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBody({ type: CreateCommentDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Responder a un comentario' })
  @ApiResponse({ status: 200, description: 'Comentario respondido' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Post(':id/reply')
  @UseGuards(JwtAuthGuard)
  async reply(@Param('id') id: string, @Body('reply') reply: string) {
    return this.commentsService.replyToComment(id, reply);
  }
}
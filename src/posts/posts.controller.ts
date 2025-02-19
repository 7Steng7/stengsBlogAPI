import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('posts') // Etiqueta para agrupar los endpoints de publicaciones
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Obtener todas las publicaciones' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'Publicaciones encontradas' }) // Respuesta esperada
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = '-createdAt',
  ) {
    return this.postsService.findAllPaginated(page, limit, sort);
  }

  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({ status: 201, description: 'Publicación creada' })
  @ApiBody({ type: CreatePostDto })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación encontrada' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Obtener una publicación ,filtrando por etiquetas' })
  @ApiResponse({ status: 200, description: 'Muestra las publicaciones filtradas' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @Get('filter')
  async findByTags(@Query('tags') tags: string) {
    const tagArray = tags.split(',');
    return this.postsService.findByTags(tagArray);
  }

  @ApiOperation({ summary: 'Obtener las publicaciones más populares' })
  @ApiResponse({ status: 200, description: 'Publicaciones populares' })
  @ApiResponse({ status: 404, description: 'Publicaciones no encontradas' })
  @Get('popular')
  async getPopularPosts() {
    return this.postsService.getPopularPosts();
  }
}
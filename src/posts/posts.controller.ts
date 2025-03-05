import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Obtener todas las publicaciones' }) 
  @ApiResponse({ status: 200, description: 'Publicaciones encontradas' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
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
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBody({ type: CreatePostDto })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación encontrada' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Obtener una publicación ,filtrando por etiquetas' })
  @ApiResponse({ status: 200, description: 'Muestra las publicaciones filtradas' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get('filter')
  @UseGuards(JwtAuthGuard)
  async findByTags(@Query('tags') tags: string) {
    const tagArray = tags.split(',');
    return this.postsService.findByTags(tagArray);
  }

  @ApiOperation({ summary: 'Obtener las publicaciones más populares' })
  @ApiResponse({ status: 200, description: 'Publicaciones populares' })
  @ApiResponse({ status: 404, description: 'Publicaciones no encontradas' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get('popular')
  @UseGuards(JwtAuthGuard)
  async getPopularPosts() {
    return this.postsService.getPopularPosts();
  }
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'usuarioEjemplo' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'usuarioEjemplo@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'Unacontraseña!' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Rol del usuario', example: 'user', required: false })
  @IsString()
  @IsOptional()
  role?: string;
}
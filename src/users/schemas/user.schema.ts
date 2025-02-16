import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@NestSchema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'Nombre de usuario', example: 'nombreEjemplo' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'nombreEjemplo@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'Unacontraseña!' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Rol del usuario', example: 'user' })
  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
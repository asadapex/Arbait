import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { UserRole } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}

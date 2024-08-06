import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@project/shared/core';
import { CommentFactory } from './comment.factory';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    public readonly commentFactory: CommentFactory
  ) {}

  public async getCommentById(id: string): Promise<CommentEntity> {
    return this.commentRepository.findById(id);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const commentEntity = this.commentFactory.create({ postId, ...dto });
    const comment = await this.commentRepository.createComment(commentEntity);

    return comment;
  }

  public async getComments(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.commentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  public async updateComment(
    id: string,
    dto: UpdateCommentDto
  ): Promise<CommentEntity> {
    const commentEntity = new CommentEntity(dto);

    try {
      await this.commentRepository.update(commentEntity);
      return commentEntity;
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}

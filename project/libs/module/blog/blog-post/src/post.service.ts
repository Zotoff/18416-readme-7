import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostQuery } from './post.query';
import { PostEntity } from './post.entity';
import { PaginationResult } from '@project/shared/core';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFactory } from './post.factory';
import { postMessages } from './post.constant';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  CommentEntity,
  CommentFactory,
  CommentRepository,
  CreateCommentDto,
} from '@project/comments';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory
  ) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(postMessages.POST_NOT_FOUND);
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    try {
      return this.postRepository.findById(id);
    } catch {
      throw new NotFoundException(postMessages.POST_NOT_FOUND);
    }
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const existsPost = await this.postRepository.findById(postId);
    const newComment = this.commentFactory.createFromDto(dto, existsPost.id);
    await this.commentRepository.save(newComment);

    return newComment;
  }

  public async makeRepost(postId: string, userId: string): Promise<PostEntity> {
    const existingPost = await this.getPost(postId);

    const repostedPublication = {
      ...existingPost,
      id: existingPost.id,
      userId: userId,
      originalUserId: existingPost.userId,
      originalPublicationId: existingPost.id,
      publicationRepostNumber: existingPost.publicationRepostNumber + 1,
      updatedAt: new Date(),
      createdAt: new Date(),
      populate: existingPost.populate,
      toPOJO: existingPost.toPOJO,
    };

    await this.postRepository.save(repostedPublication);

    return existingPost;
  }
}

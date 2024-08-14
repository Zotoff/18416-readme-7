import { PrismaClient } from '@prisma/client';
import { PrismaModelConfigs } from './prisma-model.constant';

const FIRST_POST_UUID = PrismaModelConfigs.FIRST_POST_UUID;
const SECOND_POST_UUID = PrismaModelConfigs.SECOND_POST_UUID;

const FIRST_USER_ID = PrismaModelConfigs.FIRST_USER_ID;
const SECOND_USER_ID = PrismaModelConfigs.SECOND_USER_ID;

enum PostType {
  video = 'video',
  text = 'text',
  quote = 'quote',
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      postTitle: 'Отличный текст для проверки',
      userId: FIRST_USER_ID,
      postAnons: 'какой-то там анонс публикации',
      postText: 'Какой-то там текст',
      type: PostType.text,
      publicationStatus: 'draft',
      publicationRepostNumber: 1,
      isPublicationReposted: false,
    },
    {
      id: SECOND_POST_UUID,
      quoteText:
        'Цель высшая моя - это чтобы наказание преступлению стало равным',
      quoteAuthor: 'Лис, Антикиллер',
      userId: FIRST_USER_ID,
      type: PostType.quote,
      comments: [
        {
          text: 'Это действительно отличная цитата!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно перечитать.',
          userId: SECOND_USER_ID,
        },
      ],
      tags: ['роман'],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        postTitle: post.postTitle ? post.postTitle : '',
        postAnons: post.postAnons ? post.postAnons : '',
        postText: post.postText ? post.postText : '',
        quoteText: post.quoteText ? post.quoteText : '',
        quoteAuthor: post.quoteAuthor ? post.quoteAuthor : '',
        userId: post.userId,
        type: post.type,
        tags: post.tags,
        publicationStatus: 'draft',
        publicationRepostNumber: 1,
        isPublicationReposted: false,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();

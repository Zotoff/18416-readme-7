import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class LikeRdo {
  @ApiProperty({
    description: 'user id',
    example: '661c4efd846b53843bbbb31d',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'postId',
    example: 'asdasd3-asasdds-asdasdasd-23434',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'created at',
    example: '2024-07-29T04:24:56.124Z',
  })
  @Expose()
  public createdAt: string;
}

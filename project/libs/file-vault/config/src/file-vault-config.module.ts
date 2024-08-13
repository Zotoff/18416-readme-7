import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import FileVaultConfig from './file-vault.config';
const ENV_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [FileVaultConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class FileVaultConfigModule {}

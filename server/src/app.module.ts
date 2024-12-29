import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { FeedModule } from './feed/feed.module';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    // TODO : inject secret by .env file
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'karma',
      password: '1221',
      database: 'dev_db',
      autoLoadEntities: true,
      synchronize: true, // only on dev mode
      entities: [User],
    }),
    AuthModule,
    FeedModule,
    StorageModule,
  ],
  providers: [StorageService],
})
export class AppModule {}

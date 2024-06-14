import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from '../users/users.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}

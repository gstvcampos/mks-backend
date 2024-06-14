import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

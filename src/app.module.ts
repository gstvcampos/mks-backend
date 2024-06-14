import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, AuthModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    await this.findUniqueMovieTitle(createMovieDto.title);
    const movie = await this.prisma.movie.create({ data: createMovieDto });
    return movie;
  }

  async findAll() {
    const movies = await this.prisma.movie.findMany();
    return movies;
  }

  async findOne(id: string) {
    const movie = await this.findMovieOrError(id);
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    if (updateMovieDto.title) {
      await this.findUniqueMovieTitle(updateMovieDto.title);
    }
    await this.findMovieOrError(id);
    const updatedMovie = await this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
    return updatedMovie;
  }

  async remove(id: string) {
    await this.findMovieOrError(id);
    await this.prisma.movie.delete({ where: { id } });
  }

  private async findMovieOrError(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async findUniqueMovieTitle(title: string) {
    const findMovie = await this.prisma.movie.findFirst({
      where: { title },
    });
    if (findMovie) throw new ConflictException('Movie title already exists');
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'The Shawshank Redemption',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Movie director',
    example: 'Frank Darabont',
  })
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({
    description: 'Movie release date',
    example: '1994-09-22',
  })
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: 'Movie rating',
    example: 9.3,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;
}

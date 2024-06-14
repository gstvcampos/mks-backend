import { randomUUID } from 'crypto';

export class Movie {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  rating: number;
  createdAt: string;

  constructor() {
    this.id = randomUUID();
  }
}

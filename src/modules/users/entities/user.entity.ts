import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  id: string;
  fullName: string;
  createdAt: string;
  @Exclude()
  password: string;
  email: string;
  phone: string;

  constructor() {
    this.id = randomUUID();
  }
}

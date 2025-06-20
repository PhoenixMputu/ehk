import { User } from './user.type'; // ou le bon chemin vers ton interface

export type LoginForm = Pick<User, 'email' | 'password'>;

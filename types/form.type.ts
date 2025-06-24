import { User } from './user.type';

export type LoginForm = Pick<User, 'email' | 'password'>;

export type RegisterForm = Omit<User, 'id' | 'photo'> & Partial<Pick<User, 'birthDate' | 'province'>>;

import { User } from './user.type';

export type LoginForm = Pick<User, 'email' | 'password'>;

export type RegisterForm = Omit<Partial<User>, 'id' | 'email' | 'password' | 'confirmPassword'> & {
    email: string;
    password: string;
    confirmPassword: string;
};

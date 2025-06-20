export interface User {
    id: string;
    name: string;
    firstName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: string;
    birthDate: Date | string;
    province: string;
}
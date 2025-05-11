export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

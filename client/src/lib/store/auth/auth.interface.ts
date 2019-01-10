export interface RegisterInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}

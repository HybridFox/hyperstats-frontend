export interface RegisterInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface ProfileInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    created: string;
    lastUpdated: string;
    company: {
        name: string;
        address: {
            street: string;
            number: string;
            box: string;
            zipCode: number;
            city: string;
            country: string;
        }
    };
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}

export interface RequestPasswordResetInterface {
    email: string;
}

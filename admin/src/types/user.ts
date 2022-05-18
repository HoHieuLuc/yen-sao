export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    fullname: string;
}

export interface CurrentUser {
    me: User;
}

export interface LoginData {
    login: {
        value: string;
    }
}

export interface LoginVars {
    username: string;
    password: string;
}

export interface ChangePasswordVars {
    oldPassword: string;
    newPassword: string;
}
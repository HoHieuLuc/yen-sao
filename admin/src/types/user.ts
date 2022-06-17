import { PaginateVars, PageInfo } from './paginate';

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    fullname: string;
    isBanned: boolean;
}

export interface CurrentUser {
    me?: User;
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

export interface AllUsers {
    user: {
        all: {
            docs: Array<User>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllUsersVars extends PaginateVars {
    search?: string;
}

export interface BanByIdVars {
    id: string;
    isBanned: boolean;
}

export interface UserById {
    user: {
        byID?: User;
    }
}

export interface CreateUserVars {
    username: string;
    password: string;
    fullname: string;
    email: string;
}

export interface UpdateUserVars {
    payload: {
        fullname: string;
        email: string;
    }
}
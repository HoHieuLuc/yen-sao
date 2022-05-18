import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { ChangePasswordVars, CurrentUser, LoginData, LoginVars } from '../../types';

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        user {
            login(username: $username, password: $password) {
                value
            }
        }
    }
`;

const ME = gql`
    query Me {
        user {
            me {
                id
                username
                email
                fullname
                role
            }
        }
    }
`;

const CHANGE_PASSWORD = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
        user {
            changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
                id
            }
        }
    }
`;

export const authQuery = {
    ME,
};

const useLazyCurrentUser = () => {
    return useLazyQuery<
        { user: CurrentUser }
    >(ME, {
        onError: (error) => {
            if (error.networkError && error.networkError.message === 'Failed to fetch') {
                return showErrorNotification('Không thể kết nối đến máy chủ');
            }
            localStorage.removeItem('token');
            location.reload();
        },
    });
};

const useLogin = () => {
    return useMutation<
        { user: LoginData }, LoginVars
    >(LOGIN, {
        onError: (error) => {
            showErrorNotification(error.message);
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.user.login.value);
        }
    });
};

const useChangePassword = () => {
    return useMutation<
        never, ChangePasswordVars
    >(CHANGE_PASSWORD, {
        onCompleted: () => showSuccessNotification('Đổi mật khẩu thành công'),
        onError: (error) => showErrorNotification(error.message),
    });
};

export const authHooks = {
    useLazyCurrentUser,
    useChangePassword,
    useLogin,
};
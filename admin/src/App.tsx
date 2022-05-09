import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import Logout from './components/Auth/Logout';
import Admin from './components/Admin/Admin';
import Login from './components/Auth/Login';

import { useLazyQuery } from '@apollo/client';
import { authQuery } from './graphql/queries';

import { showErrorNotification } from './events';
import { User } from './types';

export interface CurrentUser {
    me: User;
}

const App = () => {
    const [getCurrentUser, currentUser] = useLazyQuery<
        { user: CurrentUser }
    >(authQuery.ME, {
        onError: (error) => {
            if (error.networkError && error.networkError.message === 'Failed to fetch') {
                return showErrorNotification('Không thể kết nối đến máy chủ');
            }
            localStorage.removeItem('token');
            location.reload();
        },
    });

    useEffect(() => {
        void getCurrentUser();
    }, []);

    return currentUser.loading || !currentUser.data ?
        (
            <LoadingOverlay
                loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
                overlayOpacity={1}
                visible={true}
                zIndex={999}
            />
        ) : (
            <Routes>
                <Route
                    path='/*'
                    element={currentUser.data.user.me ?
                        <Admin /> :
                        <Navigate replace to='/login' />}
                />
                <Route
                    path='/login'
                    element={!currentUser.data.user.me ?
                        <Login getCurrentUser={getCurrentUser} /> :
                        <Navigate replace to='/' />}
                />
                <Route
                    path='/logout'
                    element={currentUser.data.user.me ? <Logout /> : <Navigate replace to='/login' />}
                />
            </Routes>
        );
};

export default App;
import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import Logout from './components/Auth/Logout';
import Admin from './components/Admin/Admin';
import Login from './components/Auth/Login';

import { authHooks } from './graphql/queries';

const App = () => {
    const [getCurrentUser, { data, loading }] = authHooks.useLazyCurrentUser();

    useEffect(() => {
        void getCurrentUser();
    }, []);

    return loading || !data ?
        (
            <LoadingOverlay
                loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
                overlayOpacity={1}
                visible={loading}
                zIndex={999}
            />
        ) : (
            <Routes>
                <Route
                    path='/*'
                    element={data.user.me ?
                        <Admin /> :
                        <Navigate replace to='/login' />}
                />
                <Route
                    path='/login'
                    element={!data.user.me ?
                        <Login getCurrentUser={getCurrentUser} /> :
                        <Navigate replace to='/' />}
                />
                <Route
                    path='/logout'
                    element={data.user.me ? <Logout /> : <Navigate replace to='/login' />}
                />
            </Routes>
        );
};

export default App;
// import { useMutation } from '@apollo/client';
// import { SINGLE_UPLOAD } from './graphql/queries/upload';
import { useEffect } from 'react';
import { LoadingOverlay } from '@mantine/core';
import Admin from './components/Admin/Admin';
import Login from './components/Auth/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { ME } from './graphql/queries/auth';
import Logout from './components/Auth/Logout';

const App = () => {
    const [getCurrentUser, currentUser] = useLazyQuery(ME);

    useEffect(() => {
        getCurrentUser();
    }, []);

    return currentUser.loading || !currentUser.data ?
        (
            <LoadingOverlay
                loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
                overlayOpacity={0.5}
                overlayColor="#c5c5c5"
                visible={true}
                zIndex={999}
            />
        ) : (
            <Routes>
                <Route
                    path='/*'
                    element={currentUser.data.me ?
                        <Admin /> :
                        <Navigate replace to='/login' />}
                />
                <Route
                    path='/login'
                    element={!currentUser.data.me ?
                        <Login getCurrentUser={getCurrentUser} /> :
                        <Navigate replace to='/dashboard' />}
                />
                <Route
                    path='/logout'
                    element={currentUser.data.me ? <Logout /> : <Navigate replace to='/login' />}
                />
            </Routes>
        );
};

export default App;
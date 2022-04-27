import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { LoadingOverlay } from '@mantine/core';

const Logout = () => {
    const client = useApolloClient();
    useEffect(() => {
        localStorage.removeItem('token');
        void client.resetStore();
    }, []);
    return (
        <LoadingOverlay
            loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
            overlayOpacity={0.5}
            overlayColor="#c5c5c5"
            visible={true}
            zIndex={999}
        />
    );
};

export default Logout;
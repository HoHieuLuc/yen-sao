import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';

import { LoadingOverlay } from '@mantine/core';

import { authHooks } from '../../graphql/queries';
import appConfig from '../../config';

const Logout = () => {
    useDocumentTitle(`Đăng xuất - ${appConfig.title}`);
    const [logout, { loading }] = authHooks.useLogout();
    
    useEffect(() => {
        void logout();
    }, []);

    return (
        <LoadingOverlay
            loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
            overlayOpacity={1}
            visible={loading}
            zIndex={999}
        />
    );
};

export default Logout;
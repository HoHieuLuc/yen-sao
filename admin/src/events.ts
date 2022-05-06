import { showNotification } from '@mantine/notifications';
import React from 'react';

export const showErrorNotification = (message: React.ReactNode) => {
    showNotification({
        title: 'Thông báo',
        message,
        color: 'red',
    });
    return null;
};

export const showSuccessNotification = (message: React.ReactNode) => {
    showNotification({
        title: 'Thông báo',
        message
    });
    return null;
};
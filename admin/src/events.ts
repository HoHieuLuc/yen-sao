import { showNotification } from '@mantine/notifications';

export const showErrorNotification = (message: string) => {
    showNotification({
        title: 'Thông báo',
        message,
        color: 'red',
    });
    return null;
};

export const showSuccessNotification = (message: string) => {
    showNotification({
        title: 'Thông báo',
        message
    });
    return null;
};
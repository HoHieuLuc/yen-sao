import { useState } from 'react';

import { Box, Button, Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { activityHooks } from '../../../../graphql/queries';
import dayjs from 'dayjs';

interface Props {
    closeModal: () => void;
}

const DeleteActivity = ({ closeModal }: Props) => {
    const [deleteActivity, { loading }] = activityHooks.useDeleteActivites();
    const [from, setFrom] = useState<Date | null>(null);
    const [to, setTo] = useState<Date | null>(null);

    const handleDelete = () => {
        void deleteActivity({
            variables: {
                from,
                to
            },
            onCompleted: () => closeModal()
        });
    };

    return (
        <Box>
            <DatePicker
                value={from}
                onChange={setFrom}
                label='Từ ngày'
                placeholder='Trở về trước'
                maxDate={
                    to
                        ? dayjs(to).subtract(1, 'd').toDate()
                        : undefined
                }
            />
            <DatePicker
                value={to}
                onChange={setTo}
                label='Đến ngày'
                placeholder='Trở về sau'
                minDate={
                    from
                        ? dayjs(from).add(1, 'd').toDate()
                        : undefined
                }
            />
            <Group position='right' mt='md'>
                <Button
                    color='gray'
                    onClick={closeModal}
                >
                    Hủy
                </Button>
                <Button
                    color='red'
                    onClick={handleDelete}
                    loading={loading}
                    disabled={!from && !to}
                >
                    Xóa
                </Button>
            </Group>
        </Box>
    );
};

export default DeleteActivity;
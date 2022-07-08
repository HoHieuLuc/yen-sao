import { Center, Container, Grid, Title } from '@mantine/core';

import { User } from '../../types';

interface Props {
    user: User
}

const AccountDetails = ({ user }: Props) => {
    return (
        <Container>
            <Center mb='xs'>
                <Title>Thông tin tài khoản</Title>
            </Center>
            <Grid>
                <Grid.Col span={3}>Tên tài khoản:</Grid.Col>
                <Grid.Col span={9}>{user.username}</Grid.Col>
                <Grid.Col span={3}>Họ và tên:</Grid.Col>
                <Grid.Col span={9}>{user.fullname}</Grid.Col>
                <Grid.Col span={3}>Email:</Grid.Col>
                <Grid.Col span={9}>{user.email}</Grid.Col>
                <Grid.Col span={3}>Quyền:</Grid.Col>
                <Grid.Col span={9}>{user.role}</Grid.Col>
            </Grid>
        </Container>
    );
};

export default AccountDetails;
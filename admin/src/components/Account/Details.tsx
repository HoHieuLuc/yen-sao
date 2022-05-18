import { Center, Container, Grid, Title } from '@mantine/core';
import { authHooks } from '../../graphql/queries';

const Details = () => {
    const me = authHooks.useReadCurrentUser();
    return (
        <Container>
            <Center mb='xs'>
                <Title>Thông tin tài khoản</Title>
            </Center>
            <Grid>
                <Grid.Col span={3}>Tên tài khoản:</Grid.Col>
                <Grid.Col span={9}>{me.username}</Grid.Col>
                <Grid.Col span={3}>Họ và tên:</Grid.Col>
                <Grid.Col span={9}>{me.fullname}</Grid.Col>
                <Grid.Col span={3}>Email:</Grid.Col>
                <Grid.Col span={9}>{me.email}</Grid.Col>
                <Grid.Col span={3}>Quyền:</Grid.Col>
                <Grid.Col span={9}>{me.role}</Grid.Col>
            </Grid>
        </Container>
    );
};

export default Details;
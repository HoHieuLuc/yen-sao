import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colors[theme.primaryColor][3],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        color: theme.colorScheme === 'dark' ? '#fff' : '#000',

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.sm * 1.5,
    },
}));

const ErrorPage = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>Có lỗi xảy ra</Title>
                <Text size='lg' align='center' className={classes.description}>
                    Máy chủ không thể xử lý yêu cầu của bạn
                </Text>
                <Group position='center'>
                    <Button component={Link} to='/' variant='subtle' size='md'>
                        Quay lại trang chủ
                    </Button>
                </Group>
            </Container>
        </div>
    );
};

export default ErrorPage;
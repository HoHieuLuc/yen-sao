import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
    },
}));

const NotFound = () => {
    const { classes } = useStyles();

    return (
        <Container>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Trang này không tồn tại.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Hãy kiểm tra lại đường dẫn.
            </Text>
            <Group position="center">
                <Button component={Link} to='/' variant="subtle" size="md">
                    Quay lại trang chủ
                </Button>
            </Group>
        </Container>
    );
};

export default NotFound;
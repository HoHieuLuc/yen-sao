import { Box, ChevronIcon, Collapse, Container, Grid, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

interface Props {
    label: string;
    children: React.ReactNode | React.ReactNode[];
}

const MyAccordionItem = ({ children, label }: Props) => {
    const [opened, setOpen] = useState(false);

    return (
        <Box>
            <UnstyledButton
                onClick={() => setOpen((o) => !o)}
                sx={(theme) => ({
                    '&:hover': {
                        backgroundColor: theme.colorScheme === 'dark'
                            ? theme.colors.gray[9]
                            : theme.colors.gray[1],
                    },
                    padding: '1rem',
                    borderRadius: theme.radius.xs,
                    width: '100%'
                })}
            >
                <Grid align='center' columns={24}>
                    <Grid.Col span={1}
                        style={{
                            transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease-in-out',
                            transformOrigin: 'center',
                        }}
                    >
                        <ChevronIcon />
                    </Grid.Col>
                    <Grid.Col span={23}>
                        {label}
                    </Grid.Col>
                </Grid>
            </UnstyledButton>
            <Container fluid mb={opened ? 'md' : undefined}>
                <Collapse in={opened}>
                    {children}
                </Collapse>
            </Container>
        </Box>
    );
};

export default MyAccordionItem;
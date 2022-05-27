import { Center, Pagination, PaginationProps, Select, SimpleGrid } from '@mantine/core';

interface Props extends PaginationProps {
    limit: string;
    onLimitChange: (limit: string) => void;
}

const AppPagination = ({ limit, onLimitChange, ...props }: Props) => {
    return (
        <SimpleGrid
            cols={2}
            spacing='xs'
            breakpoints={[{ maxWidth: 500, cols: 1 }]}
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                [theme.fn.smallerThan('sm')]: {
                    flexDirection: 'column',
                }
            })}
        >
            <Center>
                <Pagination
                    {...props}
                    styles={(theme) => ({
                        item: {
                            [theme.fn.smallerThan('sm')]: {
                                fontSize: '0.8rem'
                            }
                        },
                    })}
                />
            </Center>
            <Center>
                <Select
                    style={{
                        width: 'fit-content'
                    }}
                    data={[
                        { value: '10', label: '10 dòng mỗi trang' },
                        { value: '20', label: '20 dòng mỗi trang' },
                        { value: '50', label: '50 dòng mỗi trang' },
                    ]}
                    value={limit}
                    onChange={onLimitChange}
                />
            </Center>
        </SimpleGrid>
    );
};

export default AppPagination;
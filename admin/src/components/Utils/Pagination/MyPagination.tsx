import { Center, Pagination, PaginationProps, Select, SimpleGrid } from '@mantine/core';

interface Props extends PaginationProps {
    limit: string;
    onLimitChange: (limit: string) => void;
}

const MyPagination = ({ limit, onLimitChange, ...props }: Props) => {
    return (
        <Center>
            <SimpleGrid
                cols={2}
                spacing='xs'
                breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
            >
                <Center>
                    <Pagination
                        {...props}
                    />
                </Center>
                <Select
                    data={[
                        { value: '10', label: '10 dòng mỗi trang' },
                        { value: '20', label: '20 dòng mỗi trang' },
                        { value: '50', label: '50 dòng mỗi trang' },
                    ]}
                    value={limit}
                    onChange={onLimitChange}
                />
            </SimpleGrid>
        </Center>
    );
};

export default MyPagination;
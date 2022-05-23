import { Anchor, ScrollArea, Table, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { convertToVietnameseDate } from '../../../utils/common';
import { Activity } from '../../../types';

interface Props {
    data: Array<Activity>;
    currentPage: number;
    limit: number;
}

const ActivityList = ({ data, currentPage, limit }: Props) => {
    const activityElements = data.map((item, index) => (
        <tr key={item.id}>
            <td>{limit * (currentPage - 1) + (index + 1)}</td>
            <td>{item.user.fullname}</td>
            <td>
                <Text lineClamp={1}>
                    {item.description.name}
                </Text>
            </td>
            <td>
                {item.onCollection !== 'User'
                    ? <Anchor
                        component={Link}
                        to={`/hoat-dong/${item.id}`}
                    >
                        {convertToVietnameseDate(item.createdAt)}
                    </Anchor>
                    : convertToVietnameseDate(item.createdAt)
                }
            </td>
        </tr>
    ));

    return (
        <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
            <Table striped highlightOnHover mb='sm'>
                <thead>
                    <tr style={{ whiteSpace: 'nowrap' }}>
                        <th>STT</th>
                        <th>Người thực hiện</th>
                        <th>Mô tả</th>
                        <th>Ngày thực hiện</th>
                    </tr>
                </thead>
                <tbody>
                    {activityElements}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default ActivityList;
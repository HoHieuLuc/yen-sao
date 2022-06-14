import { LinkIcon } from '../../Utils/Icons';
import { Center } from '@mantine/core';

import { convertToVietnameseDate } from '../../../utils/common';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
    index: number;
}

const CamNangItem = ({ data, index }: Props) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{data.tieuDe}</td>
            <td>{convertToVietnameseDate(data.createdAt)}</td>
            <td>{data.isPublic ? 'Công khai' : 'Không công khai'}</td>
            <td>
                <Center>
                    <LinkIcon
                        to={`/cam-nang/${data.id}/sua`}
                        label='Chỉnh sửa'
                        iconType='edit'
                        color='green'
                    />
                    <LinkIcon
                        to={`/cam-nang/${data.id}`}
                        label='Chi tiết'
                        iconType='info'
                        color='blue'
                    />
                </Center>
            </td>
        </tr>
    );
};

export default CamNangItem;
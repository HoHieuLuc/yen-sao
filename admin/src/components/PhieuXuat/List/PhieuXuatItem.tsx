import { useModals } from '@mantine/modals';

import { ActionIcon, Center } from '@mantine/core';
import Icon from '../../Utils/Icons/Icon';
import LinkIcon from '../../Utils/Icons/LinkIcon';
import DeletePhieuXuat from '../Delete/DeletePhieuXuat';
import { PhieuXuatDoc } from './PhieuXuatList';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';

interface Props {
    phieuXuat: PhieuXuatDoc;
    index: number;
}

const PhieuXuatItem = ({ phieuXuat, index }: Props) => {
    const modals = useModals();

    const openDeleteModal = (phieuXuat: PhieuXuatDoc) => {
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu xuất</h3>,
            children: <DeletePhieuXuat
                phieuXuat={phieuXuat}
                closeModal={() => modals.closeModal(modalId)}
            />
        });
    };

    return (
        <tr key={phieuXuat.id}>
            <td>{index}</td>
            <td>{phieuXuat.nguoiXuat.username}</td>
            <td>{convertToVietnameseDate(phieuXuat.createdAt)}</td>
            <td>{phieuXuat.soMatHangXuat}</td>
            <td>{convertToVND(phieuXuat.tongTien)}</td>
            <td>
                <Center>
                    <LinkIcon 
                        iconType='edit'
                        label='Sửa'
                        to={`/phieu-xuat/${phieuXuat.id}/sua`}
                        color='green'
                    />
                    <LinkIcon
                        iconType='info'
                        label='Chi tiết'
                        to={`/phieu-xuat/${phieuXuat.id}`}
                        color='blue'
                    />
                    <ActionIcon
                        variant='hover'
                        color='red'
                        onClick={() => openDeleteModal(phieuXuat)}
                    >
                        <Icon label='Xóa' iconType='delete' />
                    </ActionIcon>
                </Center>
            </td>
        </tr>
    );
};

export default PhieuXuatItem;
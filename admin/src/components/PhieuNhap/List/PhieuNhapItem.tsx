import { useModals } from '@mantine/modals';

import { ActionIcon, Center } from '@mantine/core';
import Icon from '../../Utils/Icons/Icon';
import LinkIcon from '../../Utils/Icons/LinkIcon';
import DeletePhieuNhap from '../Delete/DeletePhieuNhap';
import { PhieuNhapDoc } from './PhieuNhapList';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';

interface Props {
    phieuNhap: PhieuNhapDoc;
    index: number;
}

const PhieuNhapItem = ({ phieuNhap, index }: Props) => {
    const modals = useModals();

    const openDeleteModal = (phieuNhap: PhieuNhapDoc) => {
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu nhập</h3>,
            children: <DeletePhieuNhap
                phieuNhap={phieuNhap}
                closeModal={() => modals.closeModal(modalId)}
            />
        });
    };

    return (
        <tr key={phieuNhap.id}>
            <td>{index}</td>
            <td>{phieuNhap.nguoiNhap.username}</td>
            <td>{convertToVietnameseDate(phieuNhap.createdAt)}</td>
            <td>{phieuNhap.soMatHangNhap}</td>
            <td>{convertToVND(phieuNhap.tongTien)}</td>
            <td>
                <Center>
                    <LinkIcon 
                        iconType='edit'
                        label='Sửa'
                        to={`/phieu-nhap/${phieuNhap.id}/sua`}
                        color='green'
                    />
                    <LinkIcon 
                        iconType='info'
                        label='Chi tiết'
                        to={`/phieu-nhap/${phieuNhap.id}`}
                        color='blue'
                    />
                    <ActionIcon
                        variant='hover'
                        color='red'
                        onClick={() => openDeleteModal(phieuNhap)}
                    >
                        <Icon label='Xóa' iconType='delete' />
                    </ActionIcon>
                </Center>
            </td>
        </tr>
    );
};

export default PhieuNhapItem;
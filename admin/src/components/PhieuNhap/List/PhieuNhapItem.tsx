import { ActionIcon, Center } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { convertToVietnameseDate, convertToVND } from '../../../utils/functions';
import Icon from '../../Utils/Icons/Icon';
import LinkIcon from '../../Utils/Icons/LinkIcon';
import DeletePhieuNhap from '../Delete/DeletePhieuNhap';
import { PhieuNhapDoc } from './PhieuNhapList';

interface Props {
    phieuNhap: PhieuNhapDoc;
}

const PhieuNhapItem = ({ phieuNhap }: Props) => {
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
            <td>{phieuNhap.nguoiNhap.username}</td>
            <td>{convertToVietnameseDate(phieuNhap.createdAt)}</td>
            <td>{phieuNhap.soMatHangNhap}</td>
            <td>{convertToVND(phieuNhap.tongTien)}</td>
            <td>
                <Center>
                    <ActionIcon
                        variant='hover'
                        color='red'
                        onClick={() => openDeleteModal(phieuNhap)}
                    >
                        <Icon label='Xóa' iconType='delete' />
                    </ActionIcon>
                    <LinkIcon 
                        iconType='info'
                        label='Chi tiết'
                        to={`/phieu-nhap/${phieuNhap.id}`}
                        color='blue'
                    />
                </Center>
            </td>
        </tr>
    );
};

export default PhieuNhapItem;
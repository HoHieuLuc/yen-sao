import { useState } from 'react';

import { Anchor, Box, Grid, Paper, Stack, Text } from '@mantine/core';
import LoadingWrapper from '../Utils/Wrappers/LoadingWrapper';
import DashboardCalendar from './DashboardCalendar';
import ErrorPage from '../Utils/Errors/ErrorPage';
import { Link } from 'react-router-dom';

import { convertToShortDate, convertToVND } from '../../utils/common';
import { chiTietPhieuXuatHooks } from '../../graphql/queries';
import dayjs from 'dayjs';

const ThongTinXuatHang = () => {
    const [month, onMonthChange] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const { data, loading, error } = chiTietPhieuXuatHooks.useAllChiTietPhieuXuats({
        from: dayjs(month).startOf('month').toDate(),
        to: dayjs(month).endOf('month').toDate()
    });


    const chiTietPhieuXuatsOnSelectedDay = selectedDay && data?.chiTietPhieuXuat.all.filter(
        item => {
            const shortDate = convertToShortDate(item.ngayXuat);
            return shortDate === convertToShortDate(selectedDay.getTime());
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {loading && (
                <DashboardCalendar
                    type='Placeholder'
                    month={month}
                />
            )}
            {!loading && data && <Grid gutter='xs'>
                <Grid.Col sm={4}>
                    <DashboardCalendar
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        onMonthChange={onMonthChange}
                        month={month}
                        data={data.chiTietPhieuXuat.all}
                        type='XuatHang'
                    />
                </Grid.Col>
                <Grid.Col sm={8}>
                    <Stack align='center' spacing={0}>
                        <Text size='lg' weight={700}>
                            Thông tin xuất hàng tháng {month.getMonth() + 1}/{month.getFullYear()}
                        </Text>
                        <Text>
                            Tổng tiền xuất hàng: {convertToVND(
                                data.chiTietPhieuXuat.all.reduce(
                                    (sum, curr) => sum + curr.thanhTien, 0)
                            )}
                        </Text>
                    </Stack>
                    <Paper shadow='sm' p='sm' withBorder>
                        {chiTietPhieuXuatsOnSelectedDay && chiTietPhieuXuatsOnSelectedDay.length > 0
                            ? chiTietPhieuXuatsOnSelectedDay.map(item => {
                                return <Box key={item.id}>
                                    <Anchor component={Link} to={`/phieu-xuat/${item.id}`}>
                                        {convertToShortDate(item.ngayXuat)}
                                    </Anchor>
                                    : xuất {item.soLuongXuat / 1000}
                                    {' '}
                                    kg {item.sanPham.tenSanPham}, tổng tiền {
                                        convertToVND(item.thanhTien)
                                    }
                                </Box>;
                            })
                            : <Text>Chọn 1 ngày để xem chi tiết</Text>
                        }
                    </Paper>
                </Grid.Col>
            </Grid>}
        </LoadingWrapper>
    );
};

export default ThongTinXuatHang;
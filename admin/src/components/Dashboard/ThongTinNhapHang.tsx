import { useState } from 'react';

import { Anchor, Box, Grid, Paper, Stack, Text } from '@mantine/core';
import LoadingWrapper from '../Utils/Wrappers/LoadingWrapper';
import DashboardCalendar from './DashboardCalendar';
import ErrorPage from '../Utils/Errors/ErrorPage';
import { Calendar } from '@mantine/dates';
import { Link } from 'react-router-dom';

import { convertToShortDate, convertToVND } from '../../utils/common';
import { chiTietPhieuNhapHooks } from '../../graphql/queries';
import dayjs from 'dayjs';

const ThongTinNhapHang = () => {
    const [month, onMonthChange] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const { data, loading, error } = chiTietPhieuNhapHooks.useAllChiTietPhieuNhaps(
        {
            from: dayjs(month).startOf('month').toDate(),
            to: dayjs(month).endOf('month').toDate()
        }
    );

    const chiTietPhieuNhapsOnSelectedDay = selectedDay && data?.chiTietPhieuNhap.all.filter(
        item => {
            const shortDate = convertToShortDate(item.ngayNhap);
            return shortDate === convertToShortDate(selectedDay.getTime());
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {loading && <Calendar hideOutsideDates initialMonth={month} />}
            {!loading && data && <Grid gutter='xs'>
                <Grid.Col md={4}>
                    <DashboardCalendar
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        onMonthChange={onMonthChange}
                        month={month}
                        data={data.chiTietPhieuNhap.all}
                        type='NhapHang'
                    />
                </Grid.Col>
                <Grid.Col md={8}>
                    <Stack align="center" spacing={0}>
                        <Text size='lg' weight={700}>
                            Thông tin nhập hàng tháng {month.getMonth() + 1}/{month.getFullYear()}
                        </Text>
                        <Text>
                            Tổng tiền nhập hàng: {convertToVND(
                                data.chiTietPhieuNhap.all.reduce(
                                    (sum, curr) => sum + curr.thanhTien, 0)
                            )}
                        </Text>
                    </Stack>
                    <Paper shadow="xl" p="sm" withBorder>
                        {chiTietPhieuNhapsOnSelectedDay && chiTietPhieuNhapsOnSelectedDay.length > 0
                            ? chiTietPhieuNhapsOnSelectedDay.map(item => {
                                return <Box key={item.id}>
                                    <Anchor component={Link} to={`/phieu-nhap/${item.id}`}>
                                        {convertToShortDate(item.ngayNhap)}
                                    </Anchor>
                                    : nhập {item.soLuongNhap / 1000} kg
                                    {' '}
                                    <Anchor component={Link} to={`/san-pham/${item.sanPham.id}`}>
                                        {item.sanPham.tenSanPham}
                                    </Anchor>
                                    , thành tiền {
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

export default ThongTinNhapHang;
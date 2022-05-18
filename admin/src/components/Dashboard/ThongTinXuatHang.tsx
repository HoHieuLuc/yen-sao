import { useState } from 'react';

import { Anchor, Box, Grid, Paper, Stack, Text } from '@mantine/core';
import LoadingWrapper from '../Utils/Wrappers/LoadingWrapper';
import DashboardCalendar from './DashboardCalendar';
import ErrorPage from '../Utils/Errors/ErrorPage';
import { Calendar } from '@mantine/dates';
import { Link } from 'react-router-dom';

import { convertToShortDate, convertToVND } from '../../utils/common';
import { phieuXuatHooks } from '../../graphql/queries';
import dayjs from 'dayjs';

const ThongTinXuatHang = () => {
    const [month, onMonthChange] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const { data, loading, error } = phieuXuatHooks.useAllPhieuXuats({
        page: 1,
        limit: 1000,
        from: dayjs(month).startOf('month').toDate().getTime(),
        to: dayjs(month).endOf('month').toDate().getTime()
    });

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {loading && <Calendar initialMonth={month} />}
            {!loading && data && <Grid gutter='xs'>
                <Grid.Col md={4}>
                    <DashboardCalendar
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        onMonthChange={onMonthChange}
                        month={month}
                        data={data.phieuXuat.all.docs}
                    />
                </Grid.Col>
                <Grid.Col md={8}>
                    <Stack align='center' spacing={0}>
                        <Text size='lg' weight={700}>
                            Thông tin xuất hàng tháng {month.getMonth() + 1}/{month.getFullYear()}
                        </Text>
                        <Text>
                            Tổng tiền xuất hàng: {convertToVND(
                                data.phieuXuat.all.docs.reduce(
                                    (sum, curr) => sum + curr.tongTien, 0)
                            )}
                        </Text>
                    </Stack>
                    <Paper shadow="xl" p="sm" withBorder>
                        {selectedDay
                            ? data.phieuXuat.all.docs.filter(
                                item => {
                                    const shortDate = convertToShortDate(item.ngayXuat);
                                    return shortDate === convertToShortDate(selectedDay.getTime());
                                }
                            ).map(item => {
                                return <Box key={item.id}>
                                    <Anchor component={Link} to={`/phieu-xuat/${item.id}`}>
                                        {convertToShortDate(item.ngayXuat)}
                                    </Anchor>: xuất {item.soMatHangXuat} mặt hàng, tổng tiền {
                                        convertToVND(item.tongTien)
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
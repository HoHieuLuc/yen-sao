import { convertToShortDate } from '../../utils/common';
import { Grid, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { ChiTietPhieuNhap, ChiTietPhieuXuat } from '../../types';

interface NhapHang extends Base {
    type: 'NhapHang';
    data: Array<ChiTietPhieuNhap>;
}

interface XuatHang extends Base {
    type: 'XuatHang';
    data: Array<ChiTietPhieuXuat>;
}

interface Placeholder extends Partial<Base> {
    type: 'Placeholder';
}

interface Base {
    type: 'NhapHang' | 'XuatHang' | 'Placeholder';
    data: Array<unknown>;
    selectedDay: Date | null;
    setSelectedDay: (day: Date | null) => void;
    month: Date;
    onMonthChange: (month: Date) => void;
}

type Props = NhapHang | XuatHang | Placeholder;

const DashboardCalendar = ({ selectedDay, setSelectedDay, month, onMonthChange, data, type }: Props) => {
    if (type === 'Placeholder') {
        return (
            <Grid gutter='xs'>
                <Grid.Col sm={4}>
                    <Calendar fullWidth hideOutsideDates initialMonth={month} />
                </Grid.Col>
                <Grid.Col sm={8}></Grid.Col>
            </Grid>
        );
    }
    return (
        <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            month={month}
            onMonthChange={onMonthChange}
            hideOutsideDates
            fullWidth
            renderDay={(date) => {
                const day = date.getDate();

                let dataToday: Array<ChiTietPhieuNhap | ChiTietPhieuXuat> = [];

                if (type === 'NhapHang') {
                    dataToday = data.filter(item => {
                        return convertToShortDate(item.ngayNhap) === convertToShortDate(date);
                    });
                } else {
                    dataToday = data.filter(item => {
                        return convertToShortDate(item.ngayXuat) === convertToShortDate(date);
                    });
                }

                if (dataToday.length > 0) {
                    return <Indicator
                        size={15}
                        offset={8}
                        label={dataToday.length > 9 ? '9+' : dataToday.length}
                        color='teal'
                    >
                        <div>{day}</div>
                    </Indicator>;
                }

                return (
                    <div>{day}</div>
                );
            }}
        />
    );
};

export default DashboardCalendar;
import { convertToShortDate } from '../../utils/common';
import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';

interface Props {
    selectedDay: Date | null;
    setSelectedDay: (day: Date | null) => void;
    month: Date;
    onMonthChange: (month: Date) => void;
    data: Array<{
        createdAt: number;
        ngayNhap?: number;
        ngayXuat?: number;
    }>
}

const DashboardCalendar = ({ selectedDay, setSelectedDay, month, onMonthChange, data }: Props) => {
    return (
        <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            month={month}
            onMonthChange={onMonthChange}
            renderDay={(date) => {
                const day = date.getDate();

                const dataToday = data.filter(item => {
                    if (item.ngayNhap) {
                        return convertToShortDate(item.ngayNhap) === convertToShortDate(date);
                    }
                    if (item.ngayXuat) {
                        return convertToShortDate(item.ngayXuat) === convertToShortDate(date);
                    }
                });

                if (dataToday.length > 0) {
                    return <Indicator
                        size={12}
                        offset={8}
                        label={dataToday.length}
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
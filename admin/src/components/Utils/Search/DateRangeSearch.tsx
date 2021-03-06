import { DateRangeSearchType } from '../../../hooks/use-date-range-search-params';
import { Button, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { SearchIcon } from '../Icons';
import dayjs from 'dayjs';

const DateRangeSearch = ({ from, to, handleSearch }: DateRangeSearchType) => {
    return (
        <Grid justify='center' mb='md' align='end'>
            <Grid.Col md={4}>
                <DatePicker
                    label='Từ ngày'
                    placeholder='Trở về trước'
                    value={from.value}
                    onChange={from.onChange}
                    maxDate={
                        to.value
                            ? dayjs(to.value).subtract(1, 'd').toDate()
                            : undefined
                    }
                />
            </Grid.Col>
            <Grid.Col md={4}>
                <DatePicker
                    label='Đến ngày'
                    placeholder='Trở về sau'
                    value={to.value}
                    onChange={to.onChange}
                    minDate={
                        from.value
                            ? dayjs(from.value).add(1, 'd').toDate()
                            : undefined
                    }
                />
            </Grid.Col>
            <Grid.Col md={2}>
                <Button onClick={handleSearch} rightIcon={<SearchIcon />}>
                    Tìm kiếm
                </Button>
            </Grid.Col>
        </Grid>
    );
};

export default DateRangeSearch;
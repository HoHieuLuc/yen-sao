export const convertToVND = (money: number) => {
    return money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const convertToVietnameseDate = (date: Date | number | string) => {
    return new Date(date).toLocaleString('vi-VN');
};
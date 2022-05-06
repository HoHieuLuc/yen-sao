import { useState } from 'react';

import { AspectRatio, Grid, Image, Modal } from '@mantine/core';

interface Props {
    anhSanPham: string;
}

const ImageDisplay = ({ anhSanPham }: Props) => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Grid.Col span={4} >
                <AspectRatio ratio={16 / 9}>
                    <Image
                        onClick={() => setOpened(true)}
                        src={anhSanPham}
                        withPlaceholder
                        alt='Ảnh sản phẩm'
                        fit='contain'
                        style={{ cursor: 'pointer' }}
                    />
                </AspectRatio>
            </Grid.Col>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                centered
                overlayOpacity={0.55}
                overlayBlur={3}
                withCloseButton={false}
                size='50%'
            >
                <Image
                    src={anhSanPham}
                    withPlaceholder
                    alt='Ảnh sản phẩm'
                />
            </Modal>
        </>
    );
};

export default ImageDisplay;
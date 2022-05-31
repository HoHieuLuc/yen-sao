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
                styles={(theme) => ({
                    modal: {
                        width: '50%',
                        [theme.fn.smallerThan('sm')]: {
                            width: '100%',
                        }
                    }
                })}
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
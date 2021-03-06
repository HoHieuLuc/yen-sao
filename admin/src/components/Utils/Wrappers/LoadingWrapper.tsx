import { LoadingOverlay } from '@mantine/core';

interface Props {
    children: Array<React.ReactNode> | React.ReactNode;
    loading?: boolean;
}

const LoadingWrapper = ({ children, loading = false }: Props) => {
    return (
        <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ flexGrow: 1 }}>
                <LoadingOverlay visible={loading} />
                {children}
            </div>
        </div>
    );
};

export default LoadingWrapper;
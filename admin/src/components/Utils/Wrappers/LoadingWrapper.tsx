import { LoadingOverlay } from '@mantine/core';

interface Props {
    children: JSX.Element | Array<JSX.Element> | React.ReactNode;
    loading: boolean;
}

const LoadingWrapper = ({ children, loading }: Props) => {
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <LoadingOverlay visible={loading} />
            {children}
        </div>
    );
};

export default LoadingWrapper;
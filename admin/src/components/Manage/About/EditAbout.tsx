
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Center, Title } from '@mantine/core';
import AboutForm from './AboutForm';

import { pageHooks } from '../../../graphql/queries';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { AboutData, AboutPageVars } from '../../../types';

const EditAbout = () => {
    const { data, loading, error } = pageHooks.usePageByName<AboutData>('about');

    const [
        submitAbout, { loading: submitLoading }
    ] = pageHooks.useCreateOrUpdatePage<never, AboutPageVars>();

    const handleSubmitAbout = (value: string) => {
        void submitAbout({
            variables: {
                name: 'about',
                content: {
                    value
                }
            }
        });
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            <Center mb='sm'>
                <Title>Chỉnh sửa bài viết giới thiệu</Title>
            </Center>
            {data &&
                <AboutForm
                    inititalValue={data.page.byName ? data.page.byName.content.value : ''}
                    loading={submitLoading}
                    handleSubmit={handleSubmitAbout}
                />
            }
        </LoadingWrapper>
    );
};

export default EditAbout;
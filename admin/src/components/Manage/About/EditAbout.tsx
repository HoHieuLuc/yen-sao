import { useDocumentTitle } from '@mantine/hooks';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Center, Title } from '@mantine/core';
import AboutForm from './AboutForm';

import { AboutData, AboutPageVars } from '../../../types';
import { pageHooks } from '../../../graphql/queries';
import ErrorPage from '../../Utils/Errors/ErrorPage';

interface Props {
    title: string;
}

const EditAbout = ({ title }: Props) => {
    useDocumentTitle(title);
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
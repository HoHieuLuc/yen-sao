import { useMutation, useQuery } from '@apollo/client';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Center, Title } from '@mantine/core';
import AboutForm from './AboutForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { pageQuery } from '../../../graphql/queries';
import { AboutData } from './About';

interface AboutConfigVars {
    name: 'about';
    content: {
        value: string;
    }
}

const EditAbout = () => {
    const { data, loading } = useQuery<
        AboutData, { name: 'about' }
    >(pageQuery.PAGE_BY_NAME,
        {
            variables: {
                name: 'about'
            }
        }
    );

    const [submitAbout, { loading: submitLoading }] = useMutation<
        never, AboutConfigVars
    >(pageQuery.CREATE_OR_UPDATE_PAGE, {
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
        onError: (error) => showErrorNotification(error.message)
    });

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
import AboutForm from './AboutForm';

import { AboutData, AboutPageVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: AboutData;
    setEditMode: (editMode: boolean) => void;
}

const EditAbout = ({ setEditMode, data }: Props) => {
    const [
        submitAbout, { loading }
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

    return (
        <AboutForm
            inititalValue={data.page.byName ? data.page.byName.content.value : ''}
            loading={loading}
            handleSubmit={handleSubmitAbout}
            setEditMode={setEditMode}
        />
    );
};

export default EditAbout;
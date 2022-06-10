/* for heroku */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import AboutForm from './AboutForm';

import { AboutPageVars, AboutData } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';
import sanitizeHtml from 'sanitize-html';

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
            inititalValue={data.about
                ? sanitizeHtml(data.about.content.value, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                    allowedClasses: {
                        '*': ['*']
                    }
                })
                : ''
            }
            loading={loading}
            handleSubmit={handleSubmitAbout}
            setEditMode={setEditMode}
        />
    );
};

export default EditAbout;
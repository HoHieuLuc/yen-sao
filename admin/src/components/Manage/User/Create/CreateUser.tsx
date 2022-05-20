import { userHooks } from '../../../../graphql/queries';

import UserForm from '../Form/UserForm';

import { CreateUserVars } from '../../../../types';

interface Props {
    closeModal: () => void;
}

const CreateUser = ({ closeModal }: Props) => {
    const [createUser, { loading }] = userHooks.useCreateUser();

    const handleCreateUser = (values: CreateUserVars) => {
        void createUser({
            variables: values,
            onCompleted: () => closeModal()
        });
    };

    return (
        <UserForm
            onSubmit={handleCreateUser}
            loading={loading}
        />
    );
};

export default CreateUser;
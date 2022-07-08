import { useForm } from '@mantine/form';

import { Button, Center, Container, Group, Stack, TextInput, Title } from '@mantine/core';
import { User } from '../../types';
import { userHooks } from '../../graphql/queries';


interface Props {
    user: User
}

const EditAccount = ({ user }: Props) => {
    const [updateAccount, { loading }] = userHooks.useUpdateUser();

    const userForm = useForm({
        initialValues: {
            fullname: user.fullname,
            email: user.email
        },
        validate: {
            fullname: (value) => value ? null : 'Vui lòng nhập tên của bạn',
            email: (value) => /^(.+)@(\S+)$/.test(value) ? null : 'Email không hợp lệ',
        }
    });

    const handleSubmit = (values: typeof userForm.values) => {
        void updateAccount({
            variables: {
                payload: values
            }
        });
    };

    return (
        <form onSubmit={userForm.onSubmit(handleSubmit)} spellCheck={false}>
            <Center>
                <Title>Cập nhật tài khoản</Title>
            </Center>
            <Container>
                <Stack spacing='xs'>
                    <TextInput
                        label='Họ và tên'
                        placeholder='Nhập họ và tên'
                        {...userForm.getInputProps('fullname')}
                        required
                    />
                    <TextInput
                        label='Email'
                        placeholder='Nhập email'
                        {...userForm.getInputProps('email')}
                        required
                    />
                    <Group position='right'>
                        <Button
                            color='red'
                            onClick={() => userForm.reset()}
                        >
                            Hủy
                        </Button>
                        <Button
                            type='submit'
                            loading={loading}
                        >
                            Xác nhận
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </form>
    );
};

export default EditAccount;
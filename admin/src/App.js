import { useMutation } from '@apollo/client';
import Test from './components/Test';
import { SINGLE_UPLOAD } from './graphql/queries/upload';

function App() {
    const [upload] = useMutation(SINGLE_UPLOAD);

    function onChange({
        target: {
            validity,
            files: [file],
        },
    }) {
        if (validity.valid) {
            upload({ variables: { file } });
        }
    }

    return (
        <>
            <input type="file" required onChange={onChange} />
            <Test />
        </>
    );
}

export default App;
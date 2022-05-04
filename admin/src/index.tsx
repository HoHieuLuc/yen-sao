import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './providers/Provider';
import 'dayjs/locale/vi';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    //<React.StrictMode>
    <Provider>
        <App />
    </Provider>,
    // </React.StrictMode>
);
import { useNavigate } from 'react-router-dom';

export default function useGoBack(defaultUrl: string) {
    const navigate = useNavigate();
    if (window.history.state && window.history.state.idx > 0) {
        return () => navigate(-1);
    } else {
        return () => navigate(defaultUrl, { replace: true });
    }
}
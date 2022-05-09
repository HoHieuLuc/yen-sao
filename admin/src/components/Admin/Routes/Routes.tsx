import NotFound from '../../Utils/Errors/NotFound';
import { Routes, Route } from 'react-router-dom';

import appConfig from '../../../config';

const AppSection = () => {
    return (
        <Routes>
            {appConfig.links.map(link => {
                if (link.type === 'menu') {
                    return link.subLinks.map(subLink => {
                        return (
                            <Route
                                key={subLink.title}
                                path={subLink.to}
                                element={subLink.element}
                            />
                        );
                    });
                }
                return (
                    <Route key={link.title} path={link.to} element={link.element} />
                );
            })}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default AppSection;
import NotFound from '../../Utils/Errors/NotFound';
import { Routes, Route } from 'react-router-dom';

import { authHooks } from '../../../graphql/queries';
import appConfig from '../../../config';

const AppSection = () => {
    const me = authHooks.useReadCurrentUser();

    return (
        <Routes>
            {appConfig.links.map(link => {
                if (link.roles && !link.roles.includes(me.role)) {
                    return null;
                }
                if (link.type === 'menu') {
                    return link.subLinks.map(subLink => {
                        if (subLink.roles && !subLink.roles.includes(me.role)) {
                            return (
                                <Route
                                    key={subLink.title}
                                    path={subLink.to}
                                    element={<NotFound />}
                                />
                            );
                        }
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
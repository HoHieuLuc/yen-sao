import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appConfig from '../../config';
import NotFound from '../NotFound/NotFound';

const AppSection = () => {
    return (
        <Routes>
            <Route path='/' element={<div>Home</div>} />
            {appConfig.links.map(link => {
                if (link.type === 'menu' && link.subLinks) {
                    return link.subLinks.map(subLink => {
                        if (subLink.type !== 'menu') {
                            return (
                                <Route
                                    key={subLink.title}
                                    path={subLink.to}
                                    element={subLink.element}
                                />
                            );
                        }
                        return null;
                    });
                }
                if (link.type !== 'menu') {
                    return (
                        <Route key={link.title} path={link.to} element={link.element} />
                    );
                }
                return null;
            })}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default AppSection;
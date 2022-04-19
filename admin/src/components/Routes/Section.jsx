import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appConfig from '../../config';
import NotFound from '../NotFound/NotFound';

const AppSection = () => {
    return (
        <Routes>
            <Route path='/' element={<div>Home</div>} />
            {appConfig.links.map(link => {
                if (link.subLinks) {
                    return link.subLinks.map(subLink => (
                        <Route
                            key={subLink.title}
                            path={subLink.to}
                            element={subLink.element}
                        />
                    ));
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
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appConfig from '../../config';
import { Navigate } from 'react-router-dom';

const AppSection = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<div>Home</div>} />
            {appConfig.navLinks.map(link => {
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
            <Route path='/*' element={<Navigate replace to='/dashboard' />} />
        </Routes>
    );
};

export default AppSection;
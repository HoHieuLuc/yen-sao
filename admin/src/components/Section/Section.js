import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appConfig from '../../config';

const AppSection = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<div>Home</div>} />
            {appConfig.navLinks.map(link => (
                <Route key={link.to} path={link.to} element={link.element} />
            ))}
        </Routes>
    );
};

export default AppSection;
import React from 'react';

interface BaseLink {
    title: string;
    icon?: React.ReactNode;
    type: 'nav' | 'menu' | 'hidden';
    roles?: Array<string>;
}

export interface NavLink extends BaseLink {
    type: 'nav';
    to: string;
    element: JSX.Element;
}

export interface NavMenu extends BaseLink {
    type: 'menu';
    subLinksPattern: string;
    subLinks: Array<AppMenuLink>
}

export interface HiddenLink extends BaseLink {
    type: 'hidden';
    to: string;
    element: JSX.Element;
}

export type AppLink = NavLink | NavMenu | HiddenLink;
export type AppMenuLink = NavLink | HiddenLink;

export interface AppConfig {
    title: string;
    apiURL: string;
    links: Array<AppLink>;
}
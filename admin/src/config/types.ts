interface BaseLink {
    title: string;
    isNotNavLink?: boolean;
}

export enum LinkTypes {
    'nav',
    'menu'
}

export interface NavLink extends BaseLink {
    type: 'nav';
    to: string;
    element: JSX.Element;
}

export interface NavMenu extends BaseLink {
    type: 'menu';
    subLinksPattern: string;
    subLinks: Array<AppLink>
}

export interface HiddenLink extends BaseLink {
    type: 'hidden';
    to: string;
    element: JSX.Element;
    isNotNavLink: boolean;
}

export type AppLink = NavLink | NavMenu | HiddenLink;

export interface AppConfig {
    title: string;
    apiURL: string;
    links: Array<AppLink>;
}
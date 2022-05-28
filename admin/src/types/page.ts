export interface BasePage<T> {
    id: string;
    name: string;
    content: T;
}

export interface AboutData {
    about?: BasePage<{
        value: string;
    }>;
}

export interface WebsiteInfo {
    address: Array<string>;
    phone: Array<string>;
    facebook: string;
}

export interface WebsiteInfoData {
    websiteInfo?: BasePage<Partial<WebsiteInfo>>
}

export interface AllPages {
    page: AboutData & WebsiteInfoData;
}

export type PageVars<T> = Omit<BasePage<T>, 'id'>;

export interface AboutPageVars extends PageVars<{value: string}> {
    name: 'about';
}

export interface WebsiteInfoVars extends PageVars<WebsiteInfo> {
    name: 'websiteInfo';
}

export interface CreateOrUpdatePage<T> {
    page: {
        createOrUpdate: BasePage<T>;
    }
}
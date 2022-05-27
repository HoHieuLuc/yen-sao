export interface BasePage<T> {
    id: string;
    name: string;
    content: {
        value: T;
    }
}

export interface AboutData {
    about?: BasePage<string>;
}

export interface AddressData {
    address?: BasePage<Array<string>>;
}

export interface PhoneNumberData {
    phone?: BasePage<Array<string>>;
}

export interface FacebookLinkData {
    facebook?: BasePage<string>;
}

export interface FeaturedProductsData {
    featuredProducts?: BasePage<Array<string>>;
}

export interface AllPages {
    page: AboutData & AddressData & PhoneNumberData & FacebookLinkData & FeaturedProductsData;
}

export type PageVars<T> = Omit<BasePage<T>, 'id'>;

export interface AboutPageVars extends PageVars<string> {
    name: 'about';
}

export interface AddressVars extends PageVars<Array<string>> {
    name: 'address';
}

export interface PhoneNumberVars extends PageVars<Array<string>> {
    name: 'phone';
}

export interface FacebookLinkVars extends PageVars<string> {
    name: 'facebook';
}

export interface FeaturedProductsVars extends PageVars<Array<string>> {
    name: 'featuredProducts';
}

export interface CreateOrUpdatePage<T> {
    page: {
        createOrUpdate: BasePage<T>;
    }
}
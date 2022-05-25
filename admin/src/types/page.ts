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

export interface FacebookLink {
    facebook?: BasePage<string>;
}

export interface AllPages {
    page: AboutData & AddressData & PhoneNumberData & FacebookLink;
}

export interface AboutPageVars {
    name: 'about';
    content: {
        value: string;
    }
}

export interface AddressVars {
    name: 'address';
    content: {
        value: Array<string>;
    }
}

export interface PhoneNumberVars {
    name: 'phone';
    content: {
        value: Array<string>;
    }
}

export interface FacebookLinkVars {
    name: 'facebook';
    content: {
        value: string;
    }
}
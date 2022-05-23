interface BasePage<T> {
    page: {
        byName: {
            id: string;
            name: string;
            content: {
                value: T
            }
        } | null;
    }
}

export type AboutData = BasePage<string>;
export type AddressData = BasePage<Array<string>>;
export type PhoneNumberData = AddressData;

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
export interface AboutData {
    page: {
        byName: {
            id: string;
            name: string;
            content: {
                value: string;
            }
        } | null
    }
}

export interface AboutPageVars {
    name: 'about';
    content: {
        value: string;
    }
}
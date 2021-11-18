export interface ChannelPartnerBranding {
    _id: string;
    branding : Branding[];
    status : boolean;
    created_on: Date;
    updated_on: Date;
    __v: number;
}

export interface Branding {
    _id: string;
    name: string;
    type: boolean;
    link: boolean;
}

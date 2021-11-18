
export interface TempSchemeSelection {
    _id: string;
    selectedSchemes : any[];
    hospitalId : string;
    userId : string;
    defaultSchemes : defaultScheme;
}

export interface Scheme {
    _id: string;
    status: boolean;
    desc: string;
    period: string;
    interest_free: number;
    emi_count: number;
    advance_emi: number;
    platform_fee: number;
    subvention: number;
    policy: number;
    total: number;
    name: string;
}

export interface defaultScheme{
    policy : string;
    non_policy : string;
}
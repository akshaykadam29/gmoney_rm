// export interface Scheme {
//     nonpolicy: Policy;
//     policy: Policy;
// }

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
    list : schemeDetails[];
}

export interface schemeDetails{
    id : string;
    name : string; 
    isSelected : Boolean;
}

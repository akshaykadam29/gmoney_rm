// export interface Reference {
//     center : string ;
//     address : string ;
//     ref_contact_person : string ;
//     ref_contact_no_1 : string ;
//     ref_contact_no_2 : string ;
//     ref_city : string;
// }
export interface LeadAssignedDetails {
    _id: string;
    email: string;
    region : string;
    state : string;
    city : string;
    locality : string;
    designation : Designation;
    reportingTo : AssignedUserDetails;
    multipleReporting : Boolean;
    status : Boolean;
    name : String;
    mobile : number;
    updated_on: Date;
    created_on : Date
    __v : number;
}

export interface AssignedUserDetails {
    _id: string;
    email: string;
    region : string;
    state : string;
    city : string;
    locality : string;
    designation : Designation;
    reportingTo : AssignedUserDetails;
    multipleReporting : Boolean;
    status : Boolean;
    name : String;
    mobile : number;
    updated_on: Date;
    created_on : Date
    __v : number;
}

export interface Designation{
    _id : string;
    roleAccess : any[];
    sort : string;
    status : Boolean;
    designation : string;
    updated_on: Date;
    created_on : Date
    __v : number;
}

export interface History{
    _id : string;
    date : Date,
    status : string,
    remarks : string,
    action : string,
    actionDate : {
        date : Date,
        offset : string
    }
}

export interface Lead{
    _id : string;
    center : string ;
    address : string ;
    city : string;
    contact : string ;
    mobile : string ;
    landline : string ;
    pincode : string;
    action : string;
    actionDate : {
        date : Date,
        offset : string
    };
    status : string;
    remark : string;
    category : string;
    history : History[];
    lead_assigned_to : LeadAssignedDetails;
    isSelected : Boolean;
    createdon: string ;
    updatedon : string ;
    advertise_name : string,
	platform_type : string,
	email : string,
	remark1: string,
	remark2: string

}
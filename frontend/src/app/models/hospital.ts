
   
    export interface AppStatus {
        _id: string;
        value: number;
        status: boolean;
        title: string;
    }


    export interface BankDetails {
        cheque_link: string;
        bank_name: string;
        bank_verified: boolean;
        account_no: string;
        ifsc: string;
    }

    export interface AgreementDetails {
        agreement_signed_date?: any;
        agreement_irn: string;
        agreement_status: string;
        agreement_id: string;
        agreement_generated: boolean;
        agreement_sent: boolean;
        agreement_audit: string;
        agreement_link: string;
        agreement_signed: boolean;
    }

    export interface AuthorisedPanDetails {
        pan_link: string;
        is_pan_verified: boolean;
        pan_type: string;
        father_name: string;
        dob: string;
        name: string;
        pan_entered: string;
    }

    export interface HospitalPanDetails {
        pan_link: string;
        is_pan_verified: boolean;
        pan_type: string;
        father_name: string;
        dob: string;
        pan_entered: string;
        name: string;
    }

    export interface ContactPerson {
        _id: string;
        designation: string;
        email: string;
        mobile_verified: boolean;
        contactNumber: string;
        name: string;
    }

    export interface Director {
        _id: string;
        agreement_signed_type: string;
        agreement_signed: boolean;
        authorized_signatory: boolean;
        designation: string;
        email: string;
        mobile_verified: boolean;
        contactNumber: string;
        name: string;
    }

    export interface ApplicationDetails {
        capture_link: string;
        profile_id: string;
        capture_expires_at: string;
        reference_id: string;
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

    export interface ChannelPartnerBranding {
        _id: string;
        branding : any[];
        status : boolean;
        created_on: Date;
        updated_on: Date;
        __v: number;
    }

    export interface Hospital {
        _id: string;
        name: string;
        mobile: number;
        __v: number;
        app_status: AppStatus;
        created_on: Date;
        updated_on: Date;
        //scheme: Scheme;
        documents_link: any[];
        bank_details: BankDetails;
        agreement_details: AgreementDetails;
        authorised_pan_details: AuthorisedPanDetails;
        hospital_pan_details: HospitalPanDetails;
        contact_persons: ContactPerson[];
        directors: Director[];
        application_details: ApplicationDetails;
        term_condition_check: boolean;
        remarks: string;
        is_disabled: boolean;
        blacklist_reason: string;
        hospital_blacklist: boolean;
        dedupe_reason: string;
        dedupe_pass: boolean;
        rohini_id: string;
        type: string;
        entity: string;
        branches: number;
        beds: number;
        ownership: string;
        address: string;
        pincode: number;
        city: string;
        state: string;
        mobile_verified: boolean;
        hid: string;
        rm_assigned: AssignedUserDetails,
        isSelected : Boolean,
        fileSelected : string;
        uploadButton : boolean;
        channelPartnerBranding : ChannelPartnerBranding;
        disputeButton : boolean;
    }


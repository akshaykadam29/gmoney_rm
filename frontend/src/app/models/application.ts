import { Hospital } from './hospital';
import { Scheme } from './scheme';
import { Customer } from './customer';
import { ApplicationStatus } from './applicationStatus';

  export interface Application {
    _id: string
    created_on: string
    updated_on: string
    documents_link: DocumentsLink[]
    offer: Offer
    app_status: AppStatus
    risk_entry: RiskEntry
    loan: Loan
    policy: Policy
    financial_data: FinancialDaum[]
    statment_password: string
    employment: Employment
    address: Address
    hospital: Hospital
    customer: Customer
    application_id: string
    credit_score : CreditScore
    financial_data_summary : any
    reject_remarks : RejectRemarks
  }

  export interface RejectRemarks{
    low_income : boolean
    low_cibil : boolean
    overleveraged : boolean
    negative_pincode : boolean
    abb_below_emi : boolean
    fraud_match : boolean
    bounce : boolean
    aigo : boolean
    others : boolean
  }

  export interface CreditScore{
    score : string
    address_match : boolean
    mobile_match : boolean
    name_match : boolean
    data : any
    raw_data : string
  }

  export interface DocumentsLink {
    _id: string
    type: string
    link: string
    name: string
  }


  export interface AppStatus {
    offer: OfferStatus
    cam: Cam
    risk2: RoleStatus
    risk1: RoleStatus
    ops2: RoleStatus
    ops1: RoleStatus
    status: ApplicationStatus
    remarks : string
  }

  export interface OfferStatus {
    accepted: boolean
    published: boolean
    disbursed: boolean
  }

  export interface Cam {
    published: boolean
    generated: boolean
  }

  export interface RoleStatus {
    updated_on: string
    remarks: string
  }


  export interface RiskEntry {
    scheme: Scheme
    updated_on: string
    last_30 : number
    last_60 : number
    scheme_change: boolean
    enach_check: boolean
    case_category: string
    reviced_emi_amount: number
    emi_amount: number
    emi_value : number
    cc_payment: number
    cc_outstanding: number
    emi_count: number
    loan_open_date : string
    loans: number
    current_balance : number
    ovedue_amount: number
    no_of_dpd: number
    credit_score: number
  }

  export interface Loan {
    loan_actions: LoanActions
    discharge_link: string
    admission_date: any
    admission_id: string
    transection_id: string
    transfer_amount: number
    adv_emi: number
    emi : number
    payable: number
    gst: number
    platform_fee: number
    subvention: number
    procedure_name: string
    hospital_estimate_validation: boolean
    hospital_estimate: number
    request_amount: number
    no_cost_emi : boolean
    advance_against_mediclaim : boolean
  }

  export interface LoanActions {
    adv_emi_collected: boolean
    undertaking: Undertaking
    agreement: Agreement
    videokyc : Videokyc
    enach : Enach
  }

  export interface Undertaking {
    link: string
    uploaded: boolean
    generated: boolean
    uploaded_at : Date
    link_new : string
    checked : boolean
  }

  export interface Enach {
    created: boolean
    mandate: boolean 
    subscription_id:string
    subscription_ref: string
    max_mandate: number
    mandate_expires: Date
  }
  
  export interface Videokyc {
    reference_id: string
    status: string
    link: string
  }

  export interface Agreement {
    sigend_at: any
    signed: boolean
    link: string
    sent: boolean
    sent_date: Date
    audit_trail: string
    fully_signed:boolean
    sign_customer_at :Date
    sign_by_customer: boolean
    sign_lender_at:Date
    sign_by_lender: boolean
    docid: string
    signed_details : SignedDetails
  }
  export interface SignedDetails{
    verification :{
      gender : string
      yob : string
      smartName : string
    },
    signer :{
      gender : string
      yob : string
      smartName : string
    }
  }

  export interface Policy {
    documents_link: any[]
    policy_amount: number
    company_name: string
    patient_name: string
    relation: string
    claimed: boolean
    policy_holder: boolean
    cases_no : number
    cases_rejected : number
    cases_fraud : number
  }

  export interface FinancialDaum {
    month: string
    salary_credit: number
    credit_date: string
    _id: string
    added_on: string
    net_income: number
    salary_gross: number
    balance_30: number
    balance_20: number
    balance_10: number
    bounces: number
    emi_6: number
    emi_5: number
    emi_4: number
    emi_3: number
    emi_2: number
    emi_1: number
    default : Date
  }

  export interface Employment {
    net_income: any
    address: Address
    company_category: string
    company_name: string
    type: string
  }


  export interface Address {
    negative_pincode: boolean
    same_as_aadhar: boolean
    pincode: number
    city: string
    address: string
    proof_type: string
    name_match : boolean
    pincode_detected : {}
  }

  export interface ApplicationDetails {
    capture_link: string
    profile_id: string
    capture_expires_at: string
    reference_id: string
  }

  export interface Offer {
    emi_start: Date
    offer_date: Date
    accepted_on: string
    accepted: boolean
    published_on: string
    published: boolean
    created_on: string
    emi: number
    interest: number
    roi: number
    tenure_months: number
    disbursal_amount: number
    gst: number
    other_charges: number
    process_fee: number
    advance_emi: number
    int_free_period_name: string
    int_free_period: number
    sanction_amount: number
    lender: string
    scheme : Scheme
  }

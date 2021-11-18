
import { Scheme } from './scheme';
export interface Customer {
  _id: string
  identity: Identity
  email_verified: boolean
  email_id: string
  mobile_verified: boolean
  mobile: number
  customer_onboard_stage: string
  customer_onboard_status: string
  customer_id: string
}

export interface Identity {
  dob: any
  created_on: string
  profile_id: string
  reference_id: string
  onboarding_link: string
  is_disabled: boolean
  video_link: string
  i_agree: boolean
  i_authorize: boolean
  customer_blacklist_reason: string
  customer_blacklist: boolean
  dedupe_reason: string
  dedupe_pass: boolean
  bank_details: BankDetails
  poa_details: PoaDetails
  selfie: Selfie
  name_as_per_aadhar: NameAsPerAadhar
  name_as_per_pan: NameAsPerPan
  gender: string
  father_name: string
  name: string
}

export interface BankDetails {
  bank_verified: boolean
  ifsc: string
  account_name: string
  account_no: string
}

export interface PoaDetails {
  is_pincode_negative: boolean
  is_pincode_match: boolean
  pan_details: PanDetails
  current_address_details: CurrentAddressDetails
  aadhar_details: AadharDetails
}

export interface PanDetails {
  pan_link: string
  is_pan_verified: boolean
  pan_type: string
  father_name: string
  dob: string
  name: string
  pan_entered: string
}

export interface CurrentAddressDetails {
  same_as_aadhar: boolean
  address_verified: boolean
  address_link: string
  address_type: string
  pincode: number
  city: string
  address: string
}

export interface AadharDetails {
  is_aadhar_verified: boolean
  dob_year: any
  photo_link: string
  name: string
  gender: string
  dob: string
  pincode: any
  city: string
  address: string
}

export interface Selfie {
  face_match: boolean
  name_match: boolean
  liveliness: boolean
  geolocation: Geolocation
  link: string
}

export interface Geolocation {
  pincode: number
  address: string
  longitude: string
  latitude: string
}

export interface NameAsPerAadhar {
  dob: string
  father_name: string
  full_name: string
}

export interface NameAsPerPan {
  dob: any
  father_name: string
  full_name: string
}

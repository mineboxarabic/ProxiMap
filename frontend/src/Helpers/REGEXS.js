export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const BIO_REGEX = /^[a-zA-Z0-9\s\.,-]{0,1000}$/;

export const STREET_REGEX = /^[a-zA-Z0-9\s\.,-]{0,100}$/;
export const CITY_REGEX = /^[a-zA-Z\s\.,-]{0,100}$/;
export const ZIP_REGEX = /^[0-9]{5}$/;
export const STATE_REGEX = /^[a-zA-Z\s\.,-]{0,100}$/;

export const COUNTRY_REGEX = /^[a-zA-Z\s\.,-]{0,100}$/;
export const PHONE_REGEX = /^[0-9]{10}$/;

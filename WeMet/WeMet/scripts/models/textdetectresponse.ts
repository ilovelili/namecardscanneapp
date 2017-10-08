/*
* Text detecting response from server side
*/
export interface ITextDetectingResponse {
    taskStatus?: string;
    name?: string;
    job?: string;
    company?: string;
    email?: string;
    web?: string;
    phone?: string;
    fax?: string;
    address?: string;
    text?: string;
}
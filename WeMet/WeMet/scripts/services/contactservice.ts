import { ITextDetectingResponse } from '../models/textdetectresponse';

/**
 * Cordova contact service
 */
export class ContactService {
    public static SaveToContact = (contact: ITextDetectingResponse, successCallback: (contact: Contact) => void, errorCallback: (error: Error) => void) => {
        let contactObj = navigator.contacts.create({
            displayName: contact.name,
            phoneNumbers: ContactService.resolvePhoneNumbers(contact),
            emails: ContactService.resolveEmails(contact),
            organizations: ContactService.resolveOrganizations(contact),
            note: ContactService.resolveNote(contact),
            urls: ContactService.resolveUrls(contact),
            addresses: ContactService.resolveAddresses(contact),
        });

        contactObj.save(successCallback, errorCallback);
    }    

    // multiple?
    private static resolvePhoneNumbers = (contact: ITextDetectingResponse): ContactField[] => {
        let contactFields: ContactField[] = [];
        contactFields.push(new ContactField('work'/*hard code a work...*/, contact.phone, false));
        return contactFields;
    };

    private static resolveEmails = (contact: ITextDetectingResponse): ContactField[] => {
        let contactFields: ContactField[] = [];
        contactFields.push(new ContactField('work', contact.email, false));
        return contactFields;
    };

    private static resolveOrganizations = (contact: ITextDetectingResponse): ContactOrganization[] => {
        let contactOrganizations: ContactOrganization[] = [];
        contactOrganizations.push(new ContactOrganization(false, 'work', contact.company, '', contact.job));
        return contactOrganizations;
    };

    private static resolveNote = (contact: ITextDetectingResponse): string => {
        return `Auto added by WeMet at ${(new Date()).toLocaleString()}`;
    };

    private static resolveUrls = (contact: ITextDetectingResponse): ContactField[] => {
        let contactFields: ContactField[] = [];
        contactFields.push(new ContactField('work', contact.web, false));
        return contactFields;
    };

    private static resolveAddresses = (contact: ITextDetectingResponse): ContactAddress[] => {
        let contactAddresses: ContactAddress[] = [];
        contactAddresses.push(new ContactAddress(false, 'work', contact.address));
        return contactAddresses;
    }
}
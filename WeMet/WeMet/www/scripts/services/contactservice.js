define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Cordova contact service
     */
    var ContactService = (function () {
        function ContactService() {
        }
        return ContactService;
    }());
    ContactService.SaveToContact = function (contact, successCallback, errorCallback) {
        var contactObj = navigator.contacts.create({
            displayName: contact.name,
            phoneNumbers: ContactService.resolvePhoneNumbers(contact),
            emails: ContactService.resolveEmails(contact),
            organizations: ContactService.resolveOrganizations(contact),
            note: ContactService.resolveNote(contact),
            urls: ContactService.resolveUrls(contact),
            addresses: ContactService.resolveAddresses(contact),
        });
        contactObj.save(successCallback, errorCallback);
    };
    // multiple?
    ContactService.resolvePhoneNumbers = function (contact) {
        var contactFields = [];
        contactFields.push(new ContactField('work' /*hard code a work...*/, contact.phone, false));
        return contactFields;
    };
    ContactService.resolveEmails = function (contact) {
        var contactFields = [];
        contactFields.push(new ContactField('work', contact.email, false));
        return contactFields;
    };
    ContactService.resolveOrganizations = function (contact) {
        var contactOrganizations = [];
        contactOrganizations.push(new ContactOrganization(false, 'work', contact.company, '', contact.job));
        return contactOrganizations;
    };
    ContactService.resolveNote = function (contact) {
        return "Auto added by WeMet at " + (new Date()).toLocaleString();
    };
    ContactService.resolveUrls = function (contact) {
        var contactFields = [];
        contactFields.push(new ContactField('work', contact.web, false));
        return contactFields;
    };
    ContactService.resolveAddresses = function (contact) {
        var contactAddresses = [];
        contactAddresses.push(new ContactAddress(false, 'work', contact.address));
        return contactAddresses;
    };
    exports.ContactService = ContactService;
});
//# sourceMappingURL=contactservice.js.map
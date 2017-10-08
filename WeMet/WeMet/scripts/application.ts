import { CameraService } from './services/cameraservice';
import { ContactService } from './services/contactservice';
import { ITextDetectingResponse } from './models/textdetectresponse';

"use strict";

export function initialize(): void {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady(): void {
    const parentElement = document.getElementById('deviceready');
    const listeningElement = parentElement.querySelector('.listening');
    const receivedElement = parentElement.querySelector('.received');
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    document.addEventListener('click', onClick, false);
}

let resolveContactInfoTempl = (contact: Contact) => {
    let namesegment = `<h4>Name:${contact.displayName }</h4>`,
        phonesegment = (contact.phoneNumbers && contact.phoneNumbers[0].value) ? `<h4>Phone: ${contact.phoneNumbers[0].value}</h4>` : '',
        emailsegment = (contact.emails && contact.emails[0].value) ? `<h4>Email: ${contact.emails[0].value}</h4>` : '',
        organizationsegment = (contact.organizations && contact.organizations[0].name) ? `<h4>Organization: ${contact.organizations[0].name}</h4>` : '',
        titlesegment = (contact.organizations && contact.organizations[0].title) ? `<h4>Title: ${contact.organizations[0].title}</h4>` : '',
        addresssegment = (contact.addresses && contact.addresses[0].formatted) ? `<h4>Address: ${contact.addresses[0].formatted}</h4>` : '',
        websitesegment = (contact.urls && contact.urls[0].value) ? `<h4>Website: ${contact.urls[0].value}</h4>` : '';        

    return `
        <h3>Contact saved</h3>
        ${namesegment}
        ${phonesegment}
        ${emailsegment}
        ${organizationsegment}
        ${titlesegment}
        ${addresssegment}
        ${websitesegment}        
    `;
};

let onTextDetectingSuccess = (data: ITextDetectingResponse) => {
    let errormsg = [];

    // no response data.
    if (!data) {
        $('#message').text('Oops, namecard not recognized');
        return;
    }

    // status is weird
    if (data.taskStatus !== 'Completed') {
        $('#message').text('Oops, namecard not recognized');
        return;
    }
    
    ContactService.SaveToContact(data,
        (contact: Contact) => {
            $('#result').html(resolveContactInfoTempl(contact));

        },
        (err: Error) => {
            $('#message').text('Oops, failed to save contact');
        }
    );    
}

let onTextDetectingError = (err) => {
    if (err) {
        $('#message').text(err);
    }
}

// Taped, launch camera
function onClick(event: Event): void {
    CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
}

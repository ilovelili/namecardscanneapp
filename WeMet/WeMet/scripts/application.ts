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

    document.querySelector('.app').addEventListener('click', onClick, false);
}

let resolveContactInfoTempl = (contact: ITextDetectingResponse) => {
    let namesegment = `<label for="name">Name:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="name" id="contactname" value="${contact.name}" />`,

        phonesegment = contact.phone ? `<label for="phone">Phone:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="phone" id="contactphone" value="${contact.phone}" />` : '',

        emailsegment = contact.email ? `<label for="phone">Mail:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="mail" id="contactmail" value="${contact.email}" />` : '',

        organizationsegment = contact.company ? `<label for="organization">Organization:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="contactorganization" id="organization" value="${contact.company}" />` : '',

        titlesegment = contact.job ? `<label for="title">Title:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="title" id="contacttitle" value="${contact.job}" />` : '',

        addresssegment = contact.address ? `<label for="address">Address:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="address" id="contactaddress" value="${contact.address}" />` : '',

        websitesegment = contact.web ? `<label for="address">Website:</label><input type="text" class="ui-corner-all ui-mini ui-input-text ui-shadow-inset" name="website" id="contactwebsite" value="${contact.web}"/>` : '';    

    return `        
        <form>            
            ${namesegment}
            ${phonesegment}
            ${emailsegment}
            ${organizationsegment}
            ${titlesegment}
            ${addresssegment}
            ${websitesegment}
            <input type="submit" class="ui-btn ui-corner-all ui-btn-inline" id="saveContact" value="Save Contact" />
        </form>
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

    $('#result').html(resolveContactInfoTempl(data));
    document.querySelector('#saveContact').addEventListener('touchend', saveContact, false);
}

let saveContact = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    
    let contact: ITextDetectingResponse = {
        name: <string>$('#contactname').val(),
        phone: $('#contactphone') ? <string>$('#contactphone').val() : null,
        company: $('#contactcompany') ? <string>$('#contactcompany').val() : null,
        job: $('#contacttitle') ? <string>$('#contacttitle').val() : null,
        email: $('#contactemail') ? <string>$('#contactemail').val() : null,
        web: $('#contactweb') ? <string>$('#contactweb').val() : null,
        address: $('#contactaddress') ? <string>$('#contactaddress').val() : null,
    }

    ContactService.SaveToContact(contact,
        (contact: Contact) => {            
            $('#result').html('<h4>Contact Saved</h4>');            
        },
        (err: Error) => {
            $('#message').text('Oops, failed to save contact');
        }
    );
}

let onTextDetectingError = (err) => {
    if (err) {
        $('#message').text('Oops, something wrong. Please retry');
    }
}

// Taped, launch camera
function onClick(event: Event): void {
    CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
}

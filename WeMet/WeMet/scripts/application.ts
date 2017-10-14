import { CameraService } from './services/cameraservice';
import { ContactService } from './services/contactservice';
import { ITextDetectingResponse } from './models/textdetectresponse';

"use strict";

export function initialize(): void {
    document.addEventListener('deviceready', onDeviceReady, false);
    document.querySelector('.app').addEventListener('click', onClick, false);    
}

function onDeviceReady(): void {
    const parentElement = document.getElementById('deviceready');
    const listeningElement = parentElement.querySelector('.listening');
    const receivedElement = parentElement.querySelector('.received');
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
}

let resolveContactInfoTempl = (contact: ITextDetectingResponse) => {
    let namesegment = `
        <div class="form-group">
            <label for="name">Name:</label><input type="text" class="form-control" name="name" id="contactname" value="${contact.name}" />
        </div>`,

        phonesegment = contact.phone ? `
        <div class="form-group">
            <label for="phone">Phone:</label><input type="text" class="form-control" name="phone" id="contactphone" value="${contact.phone}" />
        </div>
        ` : '',

        emailsegment = contact.email ? `
        <div class="form-group">
            <label for="phone">Mail:</label><input type="text" class="form-control" name="mail" id="contactmail" value="${contact.email}" />
        </div>
        ` : '',

        organizationsegment = contact.company ? `
        <div class="form-group">
            <label for="organization">Company:</label><input type="text" class="form-control" name="contactorganization" id="organization" value="${contact.company}" />
        </div>
        ` : '',

        titlesegment = contact.job ? `
        <div class="form-group">
            <label for="title">Title:</label><input type="text" class="form-control" name="title" id="contacttitle" value="${contact.job}" />
        </div>
        ` : '',

        addresssegment = contact.address ? `
        <div class="form-group">
            <label for="address">Address:</label><input type="text" class="form-control" name="address" id="contactaddress" value="${contact.address}" />
        </div>
        ` : '',

        websitesegment = contact.web ? `
        <div class="form-group">
            <label for="address">Website:</label><input type="text" class="form-control" name="website" id="contactwebsite" value="${contact.web}"/>
        </div>
        ` : '';    

    return `        
        <form class="form-horizontal">
            <fieldset>                
                ${namesegment}
                ${phonesegment}
                ${emailsegment}
                ${organizationsegment}
                ${titlesegment}
                ${addresssegment}
                ${websitesegment}
                <input type="submit" class="btn btn-primary" id="saveContact" value="Save Contact" />
            </fieldset>
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
    const clickhandler = ('ontouchend' in document.documentElement ? "touchend" : "click");
    document.querySelector('#saveContact').addEventListener(clickhandler, saveContact, false);
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
        // $('#message').text('Oops, something wrong. Please retry');
    }
}

let onClick = (event: Event) => {
    CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
}

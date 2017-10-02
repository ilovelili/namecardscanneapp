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
            $('#result').text('Contact saved');
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

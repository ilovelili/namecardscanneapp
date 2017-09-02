import { CameraService } from './services/cameraservice';
import { ITextDetectingResponse } from './model/textdetectresponse';

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
    if (data && data.Success) {
        $('#result').text(data.Text);
    }
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

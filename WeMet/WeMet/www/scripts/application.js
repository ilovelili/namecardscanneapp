define(["require", "exports", "./services/cameraservice", "./services/contactservice"], function (require, exports, cameraservice_1, contactservice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    "use strict";
    function initialize() {
        document.addEventListener('deviceready', onDeviceReady, false);
    }
    exports.initialize = initialize;
    function onDeviceReady() {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        document.addEventListener('click', onClick, false);
    }
    var onTextDetectingSuccess = function (data) {
        var errormsg = [];
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
        contactservice_1.ContactService.SaveToContact(data, function (contact) {
            $('#result').text('Contact saved');
        }, function (err) {
            $('#message').text('Oops, failed to save contact');
        });
    };
    var onTextDetectingError = function (err) {
        if (err) {
            $('#message').text(err);
        }
    };
    // Taped, launch camera
    function onClick(event) {
        cameraservice_1.CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
    }
});
//# sourceMappingURL=application.js.map
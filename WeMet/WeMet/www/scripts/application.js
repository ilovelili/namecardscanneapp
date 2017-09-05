define(["require", "exports", "./services/cameraservice"], function (require, exports, cameraservice_1) {
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
        if (data) {
            // let datastring = JSON.stringify(data);    
            $('#result').text(data['Text']);
        }
    };
    var onTextDetectingError = function (err) {
        if (err) {
            var errmsg = err.responseJSON['Text'];
            $('#message').text(errmsg.replace('googleapi: ', ''));
        }
    };
    // Taped, launch camera
    function onClick(event) {
        cameraservice_1.CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
    }
});
//# sourceMappingURL=application.js.map
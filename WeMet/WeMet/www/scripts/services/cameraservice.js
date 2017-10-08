define(["require", "exports", "./textdetectingservice"], function (require, exports, textdetectingservice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Cordova camera service
     */
    var CameraService = (function () {
        function CameraService() {
        }
        return CameraService;
    }());
    CameraService.getPicture = function (successCallback, errorCallback, options) {
        navigator.camera.getPicture(function (imageData) {
            if (imageData) {
                $('#result').text();
                $('#message').text();
                $('#event').html('proceeding ...');
                textdetectingservice_1.TextDetectingService.DetectText(imageData, 
                // success
                function (data) {
                    if (data) {
                        $('#event').text('Tap To Start');
                        successCallback(data);
                    }
                }, 
                // error
                function (err) {
                    if (err) {
                        $('#event').text('Tap To Start');
                        errorCallback(err);
                    }
                });
            }
        }, function (err) {
            $('#event').text('Tap To Start');
            errorCallback(err);
        }, options);
    };
    CameraService.LaunchCamera = function (event, successCallback, errorCallback) {
        event.preventDefault();
        if (!navigator.camera) {
            // no, no, this can't be
            window.alert('Please check your camera settings');
            return;
        }
        // camera options
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0 // 0=JPG 1=PNG. JPG should be smaller in size right
        };
        CameraService.getPicture(successCallback, errorCallback, options);
    };
    exports.CameraService = CameraService;
});
//# sourceMappingURL=cameraservice.js.map
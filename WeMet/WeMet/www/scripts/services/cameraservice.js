define(["require", "exports", "./textdetectingservice"], function (require, exports, textdetectingservice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CameraService = (function () {
        function CameraService() {
        }
        return CameraService;
    }());
    CameraService.LaunchCamera = function (event, suceessCallback, errorCallback) {
        event.preventDefault();
        if (!navigator.camera) {
            // no, no, this can't be
            return;
        }
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0 // 0=JPG 1=PNG
        };
        navigator.camera.getPicture(function (imgData) {
            if (imgData) {
                textdetectingservice_1.TextDetectingService.DetectText(imgData, 
                // success
                function (data) {
                    if (data) {
                        suceessCallback(data);
                    }
                }, 
                // error
                function (err) {
                    if (err) {
                        errorCallback(err);
                    }
                });
            }
        }, function (err) {
            errorCallback(err);
        }, options);
    };
    exports.CameraService = CameraService;
});
//# sourceMappingURL=cameraservice.js.map
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Text detecting accessor
     */
    var TextDetectingService = (function () {
        function TextDetectingService() {
        }
        return TextDetectingService;
    }());
    // Prod
    // private static endpoint: string = 'http://35.185.130.184:8888/Recognize';    
    TextDetectingService.endpoint = 'http://35.185.130.184:8888/RecognizeMock';
    TextDetectingService.DetectText = function (content, successCallback, errorCallback) {
        $.ajax({
            url: TextDetectingService.endpoint,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "Data": encodeURIComponent(content),
            }),
            success: function (data) {
                successCallback(data);
            },
            error: function (err) {
                errorCallback(err);
            }
        });
    };
    exports.TextDetectingService = TextDetectingService;
});
//# sourceMappingURL=textdetectingservice.js.map
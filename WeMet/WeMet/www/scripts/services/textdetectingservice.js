define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextDetectingService = (function () {
        function TextDetectingService() {
        }
        return TextDetectingService;
    }());
    TextDetectingService.endpoint = 'http://localhost:3000/text/base64';
    TextDetectingService.DetectText = function (content, suceessCallback, errorCallback) {
        $.ajax({
            url: TextDetectingService.endpoint,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "data": content,
            }),
            success: function (data) {
                suceessCallback(data);
            },
            error: function (err) {
                errorCallback(err);
            }
        });
    };
    exports.TextDetectingService = TextDetectingService;
});
//# sourceMappingURL=textdetectingservice.js.map
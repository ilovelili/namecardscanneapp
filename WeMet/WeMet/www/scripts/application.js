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
        document.querySelector('.app').addEventListener('click', onClick, false);
    }
    var resolveContactInfoTempl = function (contact) {
        var namesegment = "<label for=\"name\">Name:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"name\" id=\"contactname\" value=\"" + contact.name + "\" />", phonesegment = contact.phone ? "<label for=\"phone\">Phone:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"phone\" id=\"contactphone\" value=\"" + contact.phone + "\" />" : '', emailsegment = contact.email ? "<label for=\"phone\">Mail:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"mail\" id=\"contactmail\" value=\"" + contact.email + "\" />" : '', organizationsegment = contact.company ? "<label for=\"organization\">Organization:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"contactorganization\" id=\"organization\" value=\"" + contact.company + "\" />" : '', titlesegment = contact.job ? "<label for=\"title\">Title:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"title\" id=\"contacttitle\" value=\"" + contact.job + "\" />" : '', addresssegment = contact.address ? "<label for=\"address\">Address:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"address\" id=\"contactaddress\" value=\"" + contact.address + "\" />" : '', websitesegment = contact.web ? "<label for=\"address\">Website:</label><input type=\"text\" class=\"ui-corner-all ui-mini ui-input-text ui-shadow-inset\" name=\"website\" id=\"contactwebsite\" value=\"" + contact.web + "\"/>" : '';
        return "        \n        <form>            \n            " + namesegment + "\n            " + phonesegment + "\n            " + emailsegment + "\n            " + organizationsegment + "\n            " + titlesegment + "\n            " + addresssegment + "\n            " + websitesegment + "\n            <input type=\"submit\" class=\"ui-btn ui-corner-all ui-btn-inline\" id=\"saveContact\" value=\"Save Contact\" />\n        </form>\n    ";
    };
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
        $('#result').html(resolveContactInfoTempl(data));
        document.querySelector('#saveContact').addEventListener('touchend', saveContact, false);
    };
    var saveContact = function (event) {
        event.stopPropagation();
        event.preventDefault();
        var contact = {
            name: $('#contactname').val(),
            phone: $('#contactphone') ? $('#contactphone').val() : null,
            company: $('#contactcompany') ? $('#contactcompany').val() : null,
            job: $('#contacttitle') ? $('#contacttitle').val() : null,
            email: $('#contactemail') ? $('#contactemail').val() : null,
            web: $('#contactweb') ? $('#contactweb').val() : null,
            address: $('#contactaddress') ? $('#contactaddress').val() : null,
        };
        contactservice_1.ContactService.SaveToContact(contact, function (contact) {
            $('#result').html('<h4>Contact Saved</h4>');
        }, function (err) {
            $('#message').text('Oops, failed to save contact');
        });
    };
    var onTextDetectingError = function (err) {
        if (err) {
            $('#message').text('Oops, something wrong. Please retry');
        }
    };
    // Taped, launch camera
    function onClick(event) {
        cameraservice_1.CameraService.LaunchCamera(event, onTextDetectingSuccess, onTextDetectingError);
    }
});
//# sourceMappingURL=application.js.map
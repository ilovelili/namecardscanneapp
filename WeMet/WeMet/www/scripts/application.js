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
        var namesegment = "\n        <div class=\"form-group\">\n            <label for=\"name\">Name:</label><input type=\"text\" class=\"form-control\" name=\"name\" id=\"contactname\" value=\"" + contact.name + "\" />\n        </div>", phonesegment = contact.phone ? "\n        <div class=\"form-group\">\n            <label for=\"phone\">Phone:</label><input type=\"text\" class=\"form-control\" name=\"phone\" id=\"contactphone\" value=\"" + contact.phone + "\" />\n        </div>\n        " : '', emailsegment = contact.email ? "\n        <div class=\"form-group\">\n            <label for=\"phone\">Mail:</label><input type=\"text\" class=\"form-control\" name=\"mail\" id=\"contactmail\" value=\"" + contact.email + "\" />\n        </div>\n        " : '', organizationsegment = contact.company ? "\n        <div class=\"form-group\">\n            <label for=\"organization\">Company:</label><input type=\"text\" class=\"form-control\" name=\"contactorganization\" id=\"organization\" value=\"" + contact.company + "\" />\n        </div>\n        " : '', titlesegment = contact.job ? "\n        <div class=\"form-group\">\n            <label for=\"title\">Title:</label><input type=\"text\" class=\"form-control\" name=\"title\" id=\"contacttitle\" value=\"" + contact.job + "\" />\n        </div>\n        " : '', addresssegment = contact.address ? "\n        <div class=\"form-group\">\n            <label for=\"address\">Address:</label><input type=\"text\" class=\"form-control\" name=\"address\" id=\"contactaddress\" value=\"" + contact.address + "\" />\n        </div>\n        " : '', websitesegment = contact.web ? "\n        <div class=\"form-group\">\n            <label for=\"address\">Website:</label><input type=\"text\" class=\"form-control\" name=\"website\" id=\"contactwebsite\" value=\"" + contact.web + "\"/>\n        </div>\n        " : '';
        return "        \n        <form class=\"form-horizontal\">\n            <fieldset>                \n                " + namesegment + "\n                " + phonesegment + "\n                " + emailsegment + "\n                " + organizationsegment + "\n                " + titlesegment + "\n                " + addresssegment + "\n                " + websitesegment + "\n                <input type=\"submit\" class=\"btn btn-primary\" id=\"saveContact\" value=\"Save Contact\" />\n            </fieldset>\n        </form>\n    ";
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
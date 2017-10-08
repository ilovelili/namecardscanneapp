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
    var resolveContactInfoTempl = function (contact) {
        var namesegment = "<h4>Name:" + contact.displayName + "</h4>", phonesegment = (contact.phoneNumbers && contact.phoneNumbers[0].value) ? "<h4>Phone: " + contact.phoneNumbers[0].value + "</h4>" : '', emailsegment = (contact.emails && contact.emails[0].value) ? "<h4>Email: " + contact.emails[0].value + "</h4>" : '', organizationsegment = (contact.organizations && contact.organizations[0].name) ? "<h4>Organization: " + contact.organizations[0].name + "</h4>" : '', titlesegment = (contact.organizations && contact.organizations[0].title) ? "<h4>Title: " + contact.organizations[0].title + "</h4>" : '', addresssegment = (contact.addresses && contact.addresses[0].formatted) ? "<h4>Address: " + contact.addresses[0].formatted + "</h4>" : '', websitesegment = (contact.urls && contact.urls[0].value) ? "<h4>Website: " + contact.urls[0].value + "</h4>" : '';
        return "\n        <h3>Contact saved</h3>\n        " + namesegment + "\n        " + phonesegment + "\n        " + emailsegment + "\n        " + organizationsegment + "\n        " + titlesegment + "\n        " + addresssegment + "\n        " + websitesegment + "        \n    ";
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
        contactservice_1.ContactService.SaveToContact(data, function (contact) {
            $('#result').html(resolveContactInfoTempl(contact));
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
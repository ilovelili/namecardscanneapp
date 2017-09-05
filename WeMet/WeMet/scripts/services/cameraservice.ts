import { TextDetectingService } from './textdetectingservice';

export class CameraService {
    private static getPicture = (suceessCallback: Function, errorCallback: Function, options: CameraOptions) => {        
        navigator.camera.getPicture(
            (imageData) => {
                if (imageData) {
                    $('#event').text('proceeding ... ');
                    TextDetectingService.DetectText(imageData,
                        // success
                        (data) => {
                            if (data) {
                                $('#event').text('Tap To Start');
                                suceessCallback(data);
                            }
                        },
                        // error
                        (err) => {
                            if (err) {
                                $('#event').text('Tap To Start');
                                errorCallback(err);
                            }
                        }
                    );
                }
            },
            (err) => {
                $('#event').text('Tap To Start');
                errorCallback(err);
            },
            options);
    }

    public static LaunchCamera = (event: Event, suceessCallback: Function, errorCallback: Function) => {
        event.preventDefault();

        if (!navigator.camera) {
            // no, no, this can't be
            window.alert('Please check your camera settings');
            return;
        }

        // camera options
        let options: CameraOptions = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
            encodingType: 0     // 0=JPG 1=PNG. JPG should be smaller in size right
        };

        CameraService.getPicture(suceessCallback, errorCallback, options);
    };
}
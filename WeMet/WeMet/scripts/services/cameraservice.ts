import { TextDetectingService } from './textdetectingservice';

export class CameraService {
    public static LaunchCamera = (event: Event, suceessCallback: Function, errorCallback: Function) => {
        event.preventDefault();

        if (!navigator.camera) {
            // no, no, this can't be
            return;
        }

        const options: CameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
            encodingType: 0     // 0=JPG 1=PNG
        };

        navigator.camera.getPicture(
            (imgData) => {
                if (imgData) {
                    TextDetectingService.DetectText(imgData,
                        // success
                        (data) => {
                            if (data) {
                                suceessCallback(data);
                            }
                        },
                        // error
                        (err) => {
                            if (err) {
                                errorCallback(err);                                
                            }
                        }
                    );
                }
            },
            (err) => {
                errorCallback(err);
            },
            options);
    };
}
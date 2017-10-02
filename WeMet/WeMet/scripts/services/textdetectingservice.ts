/**
 * Text detecting accessor
 */
export class TextDetectingService {    
    private static endpoint: string = 'http://35.185.162.229:8888/Recognize';    

    public static DetectText = (content: string, successCallback: Function, errorCallback: Function) => {

        $.ajax({
            url: TextDetectingService.endpoint,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "Data": encodeURIComponent(content),
            }),
            success: (data) => {
                successCallback(data);
            },
            error: (err) => {
                errorCallback(err);
            }
        })
    }
}

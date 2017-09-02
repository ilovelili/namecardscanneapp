export class TextDetectingService {    
    private static endpoint: string = 'http://localhost:3000/text/base64';

    public static DetectText = (content: string, suceessCallback: Function, errorCallback: Function) => {       

        $.ajax({
            url: TextDetectingService.endpoint,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "data": content,
            }),
            success: (data) => {
                suceessCallback(data);
            },
            error: (err) => {
                errorCallback(err);
            }
        })
    }
}

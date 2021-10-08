

const successResponse = (res, code, data, message) => {

    let customMessage = () => {
        switch (code) {
            case 200: "Successed"; break;
            case 201: "Successfully Created"; break;
            default: 'Successed'; break;
        }
    };
    let response = {
        data: data,
        message: message || customMessage
    }
    res.status(code).send(response);
}

const errResponse = (res, code, message) => {
    let customMessage = () => {
        switch (code) {
            case 404: 'Not Found'; break;
            case 500: 'Internal Server Error'; break;
            case 400: 'Bad Request'; break;
            case 401: 'Unauthorized'; break;
            default: 'Unhandled Exception'; break;
        }
    };

    let response = {
        message: message || customMessage
    };

    res.status(code).send(response);
}

module.exports.successResponse = successResponse;
module.exports.errResponse = errResponse;
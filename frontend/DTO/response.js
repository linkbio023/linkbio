// A Data Transfer Object (DTO) for response object.
// The response object is used in fetching data from the server.
// It has success, message, and data properties.
// The success property is a boolean value that indicates if the request was successful.
// The message property is a string that contains a message from the server.
// The data property is an object that contains the response data.
// The data property can be of any type, depending on the response from the server.
// The response object is used to standardize the response format from the server.
// This makes it easier to handle responses in the client code.

export class ResponseDTO {
  constructor() {
    this.success = false;
    this.message = "";
    this.data = {};
  }

  setSuccess(success) {
    this.success = success;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  build() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}

export class ResponseDTO {
  constructor() {
    this.success = false;
    this.message = "";
    this.data = null;
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

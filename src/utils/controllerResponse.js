class ControllerResponse {
  constructor({ status, message, response }) {
    this.message = message || null;
    this.response = response;
  }

  send(data, status) {
    return this.response.status(200).json({
      status: status || "success",
      message: this.message,
      data,
    });
  }

  handleError(errorMessage) {
    return this.response.status(400).json({
      status: "failed",
      message: errorMessage || "An error occurred",
    });
  }

  handleNotFound(item) {
    return this.response.status(404).json({
      status: "failed",
      message: this.message || "Not found",
    });
  }
}

module.exports = ControllerResponse;

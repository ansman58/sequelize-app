class ControllerResponse {
  constructor(response) {
    this.response = response;
  }

  send(data, message, statusCode) {
    return this.response.status(statusCode || 200).json({
      status: "success",
      message,
      data,
    });
  }

  handleError(errorMessage) {
    return this.response.status(400).json({
      status: "failed",
      message: errorMessage || "An error occurred",
    });
  }

  handleNotFound(message) {
    return this.response.status(404).json({
      status: "failed",
      message: message || "Not found",
    });
  }

  handleBadRequest(message) {
    return this.response.status(400).json({
      status: "failed",
      message: message || "Bad request",
    });
  }

  handleServerError(error) {
    console.error(error);
    this.response.status(500).json({ error: error.message });
  }
}

module.exports = ControllerResponse;

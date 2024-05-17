class ErrorObject extends Error {
  log: string;
  status: number;
  message: string;
  isOperational: boolean;
  constructor(log: string, status: number, message: string) {
    super(message);
    this.log = log;
    this.status = status;
    this.message = message;
    this.isOperational = true; // Flag to denote operational, trusted error: send response to client

    Error.captureStackTrace(this, this.constructor); // ensure the stack trace includes the ErrorObject constructor
  }
}

export default ErrorObject;

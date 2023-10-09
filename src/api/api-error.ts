export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ForbiddenError extends ApiError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApiError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class LockedOutError extends ApiError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AbortError extends ApiError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

import { HttpStatus } from '@nestjs/common';

export class KnownException extends Error {
  public statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  public constructor(
    message?: string | undefined,
    options?: ErrorOptions | undefined,
  ) {
    super(message, options);
  }
}

import { HttpErrorResponse } from "@angular/common/http";

export const ERROR_RESPONSE: HttpErrorResponse = new HttpErrorResponse(
    {
      error: 'Cannot brew coffee',
      status: 418,
      statusText: 'I\'m a teapot'
    }
  );
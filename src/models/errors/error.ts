export class ResponseError extends Error {
  override name: string = 'ResponseError';
  constructor(
    public response: Response,
    msg?: string,
  ) {
    super(msg);
  }
}

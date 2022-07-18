export default class BaseError extends Error {
	public readonly message: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super();
		this.message = message;
		this.statusCode = statusCode;
	}
}

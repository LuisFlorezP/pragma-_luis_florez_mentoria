import { EventType, Headers } from "../utils/interfaces";

class EventRequest<T> {
    private headers: Headers;
    private body: T;

    constructor(event: EventType<T>) {
        this.headers = event.headers;
        this.body = event.body;
    }

    public getHeaders = (): Headers => this.headers;

    public getBody = (): T => this.body;
}

export { EventRequest };
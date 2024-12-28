import jsonwebtoken from 'jsonwebtoken';

import { EventType, Headers } from '@utils/interfaces';
import { TokenPayload } from '@utils/interfaces';

class EventRequest<T> {
    private headers: Headers;
    private body: T;
    private tokenPayload: TokenPayload;

    constructor(event: EventType<T>) {
        this.headers = event.headers;
        this.body = event.body;
        this.tokenPayload = {} as TokenPayload;
    }

    public getHeaders = (): Headers => this.headers;

    public getBody = (): T => this.body;

    public getToken = (): string => this.getHeaders().authorization.split(' ')[1];
    
    public getTokenPayload = (): TokenPayload => {
        this.tokenPayload = this.tokenPayload ? this.tokenPayload : jsonwebtoken.decode(this.getToken()) as TokenPayload;
        return this.tokenPayload;
    }
}

export { EventRequest };
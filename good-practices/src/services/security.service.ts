import jsonwebtoken from 'jsonwebtoken';

import { EventRequest } from './event-request.service';
import { TokenPayload } from '../utils/interfaces';

class Security<T> {
    constructor(
        private eventRequest: EventRequest<T>,
    ) { }

    public getPayload = (): TokenPayload => jsonwebtoken.decode(this.getToken()) as TokenPayload;

    public getToken = (): string => this.eventRequest.getHeaders().authorization.split(' ')[1];
}

export { Security };
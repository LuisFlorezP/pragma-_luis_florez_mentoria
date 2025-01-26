import { LoginHistoryService } from '@services/login-history.service';
import { EventRequest } from '@services/common/event-request.service';
import { Body, HistoryResponse } from '@utils/interfaces';
import { ENV } from '@utils/environment';

class LoginHistoryController {
    constructor(
        private service: LoginHistoryService,
        private eventRequest: EventRequest<Body>,
    ) { }

    public async get(): Promise<HistoryResponse[]> {
        const body = this.eventRequest.getBody();
        const traceID = String(this.eventRequest.getHeaders()[ENV.HEADERS.traceID]).split("1-")[1];
        
        if (!body.registrationDate && body.lastEntryDate) return await this.service.getLastLoginHistory(traceID, body.name);

        return await this.service.getLoginHistory(traceID, body);
    }
}

export { LoginHistoryController };
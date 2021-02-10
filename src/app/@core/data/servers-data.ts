import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { ServerModel } from '../models/server-models/free-champs';

export abstract class ServerData {
    abstract getServers(): Observable<ApiResult<ServerModel>>;
}

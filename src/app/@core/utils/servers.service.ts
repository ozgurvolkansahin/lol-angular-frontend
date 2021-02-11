import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ServerData } from '../data/servers-data';
import { SpectatorData } from '../data/spectator-data';
import { ApiResult } from '../models/api-result';
import { ServerModel } from '../models/server-models/server-model';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

@Injectable()
export class ServerService extends ServerData {
    constructor(private http: HttpClient) {
        super();
    }
    apiUrl = environment.apiUrl;

    getServers() {
        return this.http.get<ApiResult<ServerModel>>(`${this.apiUrl}server/get_servers`);
    }
}

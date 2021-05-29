import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { globalVariables } from 'globalVariables';
import { PlayerData } from '../data/player.data';
import { ApiResult } from '../models/api-result';

@Injectable()
export class PlayerService extends PlayerData {
    apiUrl = environment.apiUrl;
    ddVersion = globalVariables.ddVersion;
    ddLang = globalVariables.lang;
    constructor(private http: HttpClient) {
        super();
    }
    isPlayerExist(server: string, playerName: string) {
        return this.http.get<ApiResult<boolean>>(`${this.apiUrl}player/is_exist/${server}/${playerName}`);
    }
}

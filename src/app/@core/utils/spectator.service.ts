import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SpectatorData } from '../data/spectator-data';
import { ApiResult } from '../models/api-result';
import { MultipleSummoner } from '../models/match-models/multiple-summoner';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

@Injectable()
export class SpectatorService extends SpectatorData {
    constructor(private http: HttpClient) {
        super();
    }
    apiUrl = environment.apiUrl;

    getSummonerActiveGame(summonerName: string, server: string) {
        return this.http.get<ApiResult<CurrentGameInfo>>(`${this.apiUrl}spectator/${server}/${summonerName}`);
    }
}

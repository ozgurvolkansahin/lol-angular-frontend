import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { globalVariables } from 'globalVariables';
import { ChampionMasteryData } from '../data/championMastery-data';
import { ApiResult } from '../models/api-result';
import { ChampionMasteriesModel } from '../models/champion-masteries-models/champion-masteries';
import { FreeChampions } from '../models/champion-models/free-champs';

@Injectable()
export class ChampionMasteryService extends ChampionMasteryData {
    apiUrl = environment.apiUrl;
    ddVersion = globalVariables.ddVersion;
    ddLang = globalVariables.lang;
    constructor(private http: HttpClient) {
        super();
    }
    getChampionMasteries(summonerName: string, server: string, refresh: boolean) {
        if (refresh) {
            let headers = new HttpHeaders();
            headers = headers.set('refresh', 'true');
            return this.http.get<ApiResult<ChampionMasteriesModel>>(`${this.apiUrl}championmastery/${server}/${summonerName}`, {
                headers: headers,
            });
        }
        return this.http.get<ApiResult<ChampionMasteriesModel>>(`${this.apiUrl}championmastery/${server}/${summonerName}`);
    }
}

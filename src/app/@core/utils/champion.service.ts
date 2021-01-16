import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { globalVariables } from 'globalVariables';
import { ChampionData } from '../data/champion-data';
import { ApiResult } from '../models/api-result';
import { FreeChampions } from '../models/champion-models/free-champs';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

@Injectable()
export class ChampionService extends ChampionData {
    apiUrl = environment.apiUrl;
    ddVersion = globalVariables.ddVersion;
    ddLang = globalVariables.lang;
    constructor(private http: HttpClient) {
        super();
    }
    getFreeChampions() {
        return this.http.get<ApiResult<FreeChampions>>(`${this.apiUrl}champion/get_free_champions`);
    }
}

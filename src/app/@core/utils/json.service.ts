import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { globalVariables } from 'globalVariables';
import { JsonData } from '../data/json-data';
import { ApiResult } from '../models/api-result';
import { FreeChampions } from '../models/champion-models/free-champs';
import { RunesReforged } from '../models/json-models/runesReforged';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

@Injectable()
export class JsonService extends JsonData {
    apiUrl = environment.apiUrl;
    ddVersion = globalVariables.ddVersion;
    ddLang = globalVariables.lang;
    constructor(private http: HttpClient) {
        super();
    }
    getChampionJSONData(v?, lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        const version = v === undefined ? this.ddVersion : v;
        return this.http
        .get<ApiResult<any>>(`../../../assets/dragontail-${version}/${version}/data/${language}/champion.json`);
    }
    getLiveMatchMockData() {
        return this.http
        .get<CurrentGameInfo>(`../../../assets/lol-live-data.json`);
    }
    getSummonerData(v?, lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        const version = v === undefined ? this.ddVersion : v;
        return this.http
        .get<any>(`../../../assets/dragontail-${version}/${version}/data/${language}/summoner.json`);
    }
    getRunesReforged(v?, lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        const version = v === undefined ? this.ddVersion : v;
        return this.http
        .get<RunesReforged[]>(`../../../assets/dragontail-${version}/${version}/data/${language}/runesReforged.json`);
    }
}

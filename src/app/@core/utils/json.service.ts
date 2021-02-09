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
    getChampionJSONData(lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        return this.http
        .get<ApiResult<any>>(`../../../assets/dragontail/dragontail/data/${language}/champion.json`);
    }

    getSummonerData(lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        return this.http
        .get<any>(`../../../assets/dragontail/dragontail/data/${language}/summoner.json`);
    }
    getRunesReforged(lang?) {
        const language = lang === undefined ? this.ddLang : lang;
        return this.http
        .get<RunesReforged[]>(`../../../assets/dragontail/dragontail/data/${language}/runesReforged.json`);
    }
}

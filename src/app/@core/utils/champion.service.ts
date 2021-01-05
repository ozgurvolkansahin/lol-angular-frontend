import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ChampionData } from '../data/champion-data';
import { ApiResult } from '../models/api-result';
import { FreeChampions } from '../models/champion-models/free-champs';

@Injectable()
export class ChampionService extends ChampionData {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
        super();
    }
    getChampionJSONData(v, lang) {
        return this.http.get<ApiResult<any>>(`../../../assets/dragontail-${v}/${v}/data/${lang}/champion.json`);
    }
    getFreeChampions() {
        return this.http.get<ApiResult<FreeChampions>>(`${this.apiUrl}champion/get_free_champions`);
    }
}

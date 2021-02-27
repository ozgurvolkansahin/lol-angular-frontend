import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { globalVariables } from 'globalVariables';
import { ChampionWLData } from '../data/championWL-data';
import { ApiResult } from '../models/api-result';
import { ChampionMasteriesModel } from '../models/champion-masteries-models/champion-masteries';
import { MatchReferenceDto } from '../models/match-models/match';
import { MultipleSummoner } from '../models/match-models/multiple-summoner';

@Injectable()
export class ChampionWLService extends ChampionWLData {
    apiUrl = environment.apiUrl;
    ddVersion = globalVariables.ddVersion;
    ddLang = globalVariables.lang;
    constructor(private http: HttpClient) {
        super();
    }
    getWL(summonerName: string, server: string) {
        return this.http.get<ApiResult<any>>(`${this.apiUrl}championwl/${server}/${summonerName}`);
    }
    getMultipleSummoners(summonerList: string[], server: string) {
        return this.http.post<ApiResult<MultipleSummoner[]>>(`${this.apiUrl}championwl/${server}/get_multiple_summoners`, summonerList);
    }
}

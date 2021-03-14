import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MatchIDData } from '../data/matchID-data';
import { ApiResult } from '../models/api-result';
import { MatchReferenceDto } from '../models/match-models/match';
import { MatchDTO } from '../models/match-models/matchListDto';

@Injectable()
export class MatchIDService extends MatchIDData {
    constructor(private http: HttpClient) {
        super();
    }
    apiUrl = environment.apiUrl;

    getMatchData(summonerName: string, server: string, refresh: boolean) {
        if (refresh) {
            let headers = new HttpHeaders();
            headers = headers.set('refresh', 'true');
            return this.http.get<ApiResult<MatchReferenceDto[]>>(`${this.apiUrl}matchid/${server}/${summonerName}`, {
                headers: headers,
            });
        }
        return this.http.get<ApiResult<MatchReferenceDto[]>>(`${this.apiUrl}matchid/${server}/${summonerName}`);
    }
}

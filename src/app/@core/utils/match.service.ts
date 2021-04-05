import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MatchData } from '../data/match-data';
@Injectable()
export class MatchService extends MatchData {
    constructor(private http: HttpClient) {
        super();
    }
    apiUrl = environment.apiUrl;

    getMatchData(summonerName: string, server: string, refresh: boolean) {
        if (refresh) {
            let headers = new HttpHeaders();
            headers = headers.set('refresh', 'true');
            return this.http.get<any>(`${this.apiUrl}match/${server}/${summonerName}`, {
                headers: headers,
            });
        }
        return this.http.get<any>(`${this.apiUrl}match/${server}/${summonerName}`);
    }
}

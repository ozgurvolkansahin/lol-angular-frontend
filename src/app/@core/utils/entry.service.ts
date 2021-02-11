import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { EntryData } from '../data/entry-data';
import { ApiResult } from '../models/api-result';
import { Entry } from '../models/entry-models/entry';

@Injectable()
export class EntryService extends EntryData {
    constructor(private http: HttpClient) {
        super();
    }
    apiUrl = environment.apiUrl;

    getEntryData(summonerName: string, server: string) {
        return this.http.get<ApiResult<Entry[]>>(`${this.apiUrl}entry/${server}/${summonerName}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChampionService {
    constructor(private http: HttpClient) {}

    getChampionJSONData() {
        this.http.get('./assets/dragontail/mydata.json');
    }
}

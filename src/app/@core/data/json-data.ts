import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { RunesReforged } from '../models/json-models/runesReforged';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

export abstract class JsonData {
    abstract getChampionJSONData(v?, lang?): Observable<ApiResult<any>>;
    abstract getSummonerData(v?, lang?): Observable<ApiResult<any>>;
    abstract getRunesReforged(v?, lang?): Observable<RunesReforged[]>;
    abstract getLiveMatchMockData(): Observable<CurrentGameInfo>;
}

import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { RunesReforged } from '../models/json-models/runesReforged';

export abstract class JsonData {
    abstract getChampionJSONData(lang?): Observable<ApiResult<any>>;
    abstract getSummonerData(lang?): Observable<ApiResult<any>>;
    abstract getRunesReforged(lang?): Observable<RunesReforged[]>;
}

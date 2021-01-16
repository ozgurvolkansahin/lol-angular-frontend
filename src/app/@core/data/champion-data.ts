import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { FreeChampions } from '../models/champion-models/free-champs';

export abstract class ChampionData {
    abstract getChampionJSONData(v, lang): Observable<ApiResult<any>>;
    abstract getFreeChampions(): Observable<ApiResult<FreeChampions>>;
}

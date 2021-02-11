import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';

export abstract class MatchIDData {
    abstract getMatchData(summonerName: string, server: string): Observable<ApiResult<any>>;
}

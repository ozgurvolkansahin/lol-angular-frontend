import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { Entry } from '../models/entry-models/entry';

export abstract class EntryData {
    abstract getEntryData(summonerName: string, server: string): Observable<ApiResult<Entry[]>>;
}

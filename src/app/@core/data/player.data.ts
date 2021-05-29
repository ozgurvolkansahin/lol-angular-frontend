import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';

export abstract class PlayerData {
    abstract isPlayerExist(server: string, summonerName: string): Observable<ApiResult<boolean>>;
}

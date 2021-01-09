import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

export abstract class SpectatorData {
    abstract getSummonerActiveGame(summonerName: string): Observable<ApiResult<CurrentGameInfo>>;
}

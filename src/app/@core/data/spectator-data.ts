import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { MultipleSummoner } from '../models/match-models/multiple-summoner';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

export abstract class SpectatorData {
    abstract getSummonerActiveGame(summonerName: string, server: string): Observable<ApiResult<any>>;
}

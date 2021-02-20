import { MatchDTO, ParticipantDto } from './matchListDto';

export interface MatchListDto {
    startIndex: number;
    totalGames: number;
    endIndex: number;
    matches: MatchReferenceDto[];
    date: Date;
}
export interface MatchReferenceDto {
    gameId: string;
    role: string;
    season: number;
    platformId: string;
    champion: number;
    championName: string;
    queue: number;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
    lane: string;
    timestamp: number;
    matchDTO: MatchDTO;
    summonerMatchDetail: ParticipantDto;
    date: Date;
}


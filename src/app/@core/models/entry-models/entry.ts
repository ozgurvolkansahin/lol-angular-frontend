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
    queue: number;
    lane: string;
    timestamp: string;
    date: Date;
}


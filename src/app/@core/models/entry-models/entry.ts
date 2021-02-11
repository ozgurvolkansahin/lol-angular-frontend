export interface Entry {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    server: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    date: Date;
    miniSeries: MiniSeriesDTO;
}
export interface MiniSeriesDTO {
    losses: number;
    progress: string;
    wins: number;
    date: Date;
}


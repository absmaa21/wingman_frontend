export interface ICompetitiveMatchUpdate {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    /** Milliseconds since epoch */
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: "MOVEMENT_UNKNOWN";
    AFKPenalty: number;
};

export interface ICompetitiveUpdatesResponse {
    Version: number;
    /** Player UUID */
    Subject: string;
    Matches: ICompetitiveMatchUpdate[];
};

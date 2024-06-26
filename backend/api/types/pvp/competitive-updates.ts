interface ICompetitiveUpdates {
    Version: number;
    /** Player UUID */
    Subject: string;
    Matches: {
        /** Match ID */
        MatchID: string;
        /** Map ID */
        MapID: string;
        /** Season ID */
        SeasonID: string;
        /** Milliseconds since epoch */
        MatchStartTime: number;
        TierAfterUpdate: number;
        TierBeforeUpdate: number;
        RankedRatingAfterUpdate: number;
        RankedRatingBeforeUpdate: number;
        RankedRatingEarned: number;
        RankedRatingPerformanceBonus: number;
        CompetitiveMovement: 'MOVEMENT_UNKNOWN';
        AFKPenalty: number;
    }[];
}

export default ICompetitiveUpdates;

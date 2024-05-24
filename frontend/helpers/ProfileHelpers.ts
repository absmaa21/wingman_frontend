import {IQueueSkill} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/PlayerMMR.ts';
import {IFetchContentSeason} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/FetchContent.ts';
import React from 'react';
import {logInfo} from '../../backend/utils/log-system/log-system.ts';

export interface IPeakRank {
  tier: number;
  rr: number;
  rank: number;
  season: string;
}

export async function getPeakRank(
  data: IQueueSkill,
  seasons: IFetchContentSeason[],
  setData: React.Dispatch<React.SetStateAction<IPeakRank | undefined>>,
) {
  const peakRank: IPeakRank = {
    tier: -1,
    rr: -1,
    rank: 0,
    season: '',
  };

  let episode = 0;
  let act = 0;
  let lastWasEpisode = false;
  if (!seasons) {
    return;
  }
  seasons.forEach(season => {
    if (season.Name !== 'Closed Beta' && season.Type === 'episode') {
      lastWasEpisode = true;
    }
    if (season.Type === 'act') {
      act++;
      if (lastWasEpisode) {
        episode++;
        act = 1;
        lastWasEpisode = false;
      }
    }

    if (data.SeasonalInfoBySeasonID[season.ID]) {
      const s = data.SeasonalInfoBySeasonID[season.ID];
      if (s.CompetitiveTier > peakRank.tier) {
        peakRank.tier = s.CompetitiveTier;
        peakRank.rank = s.LeaderboardRank;
        peakRank.rr = s.RankedRating;
        peakRank.season = 'E' + episode + 'A' + act;
      }
      if (s.CompetitiveTier === peakRank.tier && s.RankedRating > peakRank.rr) {
        peakRank.tier = s.CompetitiveTier;
        peakRank.rank = s.LeaderboardRank;
        peakRank.rr = s.RankedRating;
        peakRank.season = 'E' + episode + 'A' + act;
      }
      if (
        s.CompetitiveTier === peakRank.tier &&
        s.RankedRating === peakRank.rr &&
        s.LeaderboardRank >= peakRank.rank
      ) {
        peakRank.tier = s.CompetitiveTier;
        peakRank.rank = s.LeaderboardRank;
        peakRank.rr = s.RankedRating;
        peakRank.season = 'E' + episode + 'A' + act;
      }
    }
  });
  setData(peakRank);
}

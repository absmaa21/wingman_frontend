import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {APP_BUILD, Color, EAppBuild} from '../../Settings';
import MatchHistoryCard from '../components/MatchHistoryCard';
import MatchHistoryScreen from '../components/MatchHistoryScreen';
import PropTypes from 'prop-types';
import {useApi} from '../contexts/apiContext';
import ValorantClient from '../../backend/api/clients/valorant-client';
import MatchHistoryEndpoint from '../../backend/api/endpoints/pvp/match-history';
import {logError, logInfo} from '../../backend/utils/log-system/log-system';
import {
  EQueueID,
  IMatch,
} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchHistory';
import {IMatchDetailsResponse} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails';
import MatchDetailsEndpoint from '../../backend/api/endpoints/pvp/match-details';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column.tsx';
import ProfileHeader from '../components/ProfileHeader.tsx';
import ProfileRank from '../components/ProfileRank.tsx';
import ProfileStat from '../components/ProfileStat.tsx';
import tempMatchDetails from '../temp_data/tempMatchHistory';
import DropDown from '../components/DropDown.tsx';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';
import {loadFetchContent, loadPlayerMMR} from '../interface.ts';
import {getPeakRank, IPeakRank} from '../helpers/ProfileHelpers.ts';
import {IFetchContentResponse} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/FetchContent.ts';
import {useGameContentClient} from '../contexts/gameContentClientContext.tsx';
import IPlayerMMR from '../../backend/api/types/pvp/player-mmr.ts';

ProfileScreen.propType = {
  puuid: PropTypes.string,
};

export default function ProfileScreen(
  props: PropTypes.InferProps<typeof ProfileScreen.propType>,
) {
  const api = useApi();
  const gameContentClient = useGameContentClient();
  const client = new ValorantClient(gameContentClient);
  const puuid =
    props.puuid ?? api.getUserApi().getActiveUser()?.accountInfo.sub;
  let index: number = 0;

  const [fetchedMatchHistory, setFetchedMatchHistory] = useState<IMatch[]>([]);
  const [matchDetails, setMatchDetails] = useState<IMatchDetailsResponse[]>([]);
  const [profileData, setProfileData] = useState<IPlayerMMR | undefined>();
  const [fetchContent, setFetchContent] = useState<IFetchContentResponse>();
  const [peakRank, setPeakRank] = useState<IPeakRank>();
  const [lastFetchTime, setLastFetchTime] = useState<number | undefined>(
    undefined,
  );
  const [reloadRequested, setReloadRequested] = useState(false);
  const [chosenMatch, setChosenMatch] = useState<
    IMatchDetailsResponse | undefined
  >();
  const [chosenQueueID, setChosenQueueID] = useState('competitive');
  const [chosenSeasonID, setChosenSeasonID] = useState('E7A3');

  function loadMatchHistory() {
    if (APP_BUILD === EAppBuild.FRONTEND || !props.puuid) {
      return;
    }

    new MatchHistoryEndpoint(
      api.getUserApi().getActiveUser()!,
      index,
      20,
      undefined,
      props.puuid,
    )
      .query(client)
      .then(r => {
        if (r.isErr()) {
          logError(r.getErr()?.message);
          return;
        }
        setFetchedMatchHistory(prev => [...prev, ...r.unwrap().History]);
      });
  }

  function loadMatchDetails() {
    if (APP_BUILD === EAppBuild.FRONTEND) {
      setMatchDetails([tempMatchDetails]);
      return;
    }

    fetchedMatchHistory.forEach(match => {
      logInfo('loadMatchDetails(): trying to fetch: ' + match.MatchID);
      new MatchDetailsEndpoint(api.getUserApi().getActiveUser()!, match.MatchID)
        .query(client)
        .then(r => {
          if (r.isErr()) {
            logError(r.getErr()?.message);
            return;
          }
          logInfo(
            "loadMatchDetails(): fetched MatchDetails of '" +
              r.unwrap().matchInfo.matchId +
              "'",
          );
          setMatchDetails((prev: IMatchDetailsResponse[]) => [
            ...prev,
            r.unwrap() as IMatchDetailsResponse,
          ]);
        });
    });
  }

  useEffect(() => {
    // Check if the last fetch was more than 5 minutes ago
    const canFetch =
      !lastFetchTime || Date.now() - lastFetchTime >= 0.1 * 60 * 1000;

    if (canFetch) {
      logInfo('ProfileScreen.tsx: Fetching Data ...');
      loadPlayerMMR(api, puuid!, setProfileData);
      loadFetchContent(api, setFetchContent).then(() => {});
      loadMatchHistory();
      setLastFetchTime(Date.now());
    }
    setReloadRequested(false);
  }, [api, lastFetchTime, puuid, reloadRequested]);

  useEffect(() => {
    getPeakRank(
      profileData?.QueueSkills.competitive!,
      fetchContent?.Seasons!,
      setPeakRank,
    );
  }, [profileData, fetchContent]);

  useEffect(() => {
    if (fetchedMatchHistory.length > 0 || APP_BUILD === EAppBuild.FRONTEND) {
      loadMatchDetails();
    }
  }, [fetchedMatchHistory]);

  const playerName = 'orcan';
  const playerTag = '420';
  const playerLevel = 101;

  const playerDamageRoundDelta = 117.3;
  const playerKD = 1.29;
  const playerHS = 26.2;
  const playerWR = 56.4;

  const queueIdData = [
    EQueueID.COMPETITIVE,
    EQueueID.PREMIER,
    EQueueID.DEATHMATCH,
    EQueueID.UNRATED,
    EQueueID.SWIFTPLAY,
    EQueueID.SPIKERUSH,
    EQueueID.HURM,
    EQueueID.GGTEAM,
  ];

  const seasonIdData = [
    'E7A3',
    'E7A2',
    'E7A2',
    'E6A3',
    'E6A2',
    'E6A1',
    'E5A3',
    'E5A2',
    'E5A2',
    'E4A3',
    'E4A2',
    'E4A1',
    'E3A3',
    'E3A2',
    'E3A1',
    'E2A3',
    'E2A2',
    'E2A1',
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={reloadRequested}
          onRefresh={() => setReloadRequested(true)}
        />
      }>
      {profileData && (
        <Column gap={4}>
          <ProfileHeader
            name={playerName}
            tag={playerTag}
            title={'VCT Champion 2024'}
            level={playerLevel}
            cardUuid={'3c112fe6-4685-d426-de5c-82817fdb8bde'}
          />
          <Row>
            <ProfileRank
              tier={profileData.LatestCompetitiveUpdate.TierAfterUpdate}
              rr={profileData.LatestCompetitiveUpdate.RankedRatingAfterUpdate}
            />
            {peakRank && (
              <ProfileRank
                tier={peakRank.tier}
                rr={peakRank.rr}
                rank={peakRank.rank}
                season={peakRank.season}
              />
            )}
          </Row>

          <Row>
            <Container
              hasBottomLeftCorner
              flex={1}
              padding={2}
              paddingHorizontal={6}>
              <ProfileStat
                header={'Damage/Round'}
                detail={playerDamageRoundDelta.toFixed(1)}
              />
            </Container>
            <Container flex={1} padding={2} paddingHorizontal={6}>
              <ProfileStat header={'KD'} detail={playerKD.toFixed(2)} />
            </Container>
            <Container flex={1} padding={2} paddingHorizontal={6}>
              <ProfileStat header={'HS%'} detail={playerHS.toFixed(0) + '%'} />
            </Container>
            <Container
              hasBottomRightCorner
              flex={1}
              padding={2}
              paddingHorizontal={6}>
              <ProfileStat
                header={'Win %'}
                detail={playerWR.toFixed(0) + '%'}
              />
            </Container>
          </Row>
        </Column>
      )}

      <Row align={EJustifyContent.BETWEEN}>
        <DropDown
          title={chosenQueueID}
          setItem={setChosenQueueID}
          data={queueIdData}
        />
        <DropDown
          title={chosenSeasonID}
          setItem={setChosenSeasonID}
          data={seasonIdData}
        />
      </Row>

      <View style={styles.flatList}>
        {matchDetails.map(item => {
          return (
            <MatchHistoryCard
              matchDetails={item}
              puuid={puuid ?? '92fc5f4b-de99-596c-9122-875625c115b4'}
              setChosenMatch={setChosenMatch}
            />
          );
        })}
      </View>

      {chosenMatch && (
        <MatchHistoryScreen
          match={chosenMatch}
          setChosenMatch={setChosenMatch}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
    backgroundColor: Color.backgroundPrimary,
  },
  flatList: {
    gap: 8,
  },
});

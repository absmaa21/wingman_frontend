/*
    These settings are needed project wide.
    Some settings can be changed by the user.
*/

export enum EAppBuild {
  PUBLIC,
  PRIVATE,
  FRONTEND,
}

export enum EStatsPeriod {
  LAST_MATCH,
  LAST_5_MATCHES,
  LAST_10_MATCHES,
  CURRENT_ACT,
}

export const APP_VERSION: string = '0.5.0';
export const APP_BUILD: EAppBuild = EAppBuild.PUBLIC;

export const Color = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1c1c1c',
  backgroundThird: '#222222',
  backgroundFourth: '#080808',

  textPrimary: '#fff',
  textSecondary: '#ddd',
  textThird: '#bbb',
  textFourth: '#757575',
  textFifth: '#616161',
  textSixth: '#444',

  accent: '#7d00ff',

  valorantRed: '#ff4655',
  valorantRedDark: '#d74655',
  valorantRedDarker: '#9a3e52',
  valorantCyan: '#22fec4',
  valorantCyanDark: '#22dec4',
  valorantCyanDarker: '#1ba691',
  valorantYellow: '#f0cd77',
  valorantYellowDark: '#b29b5e',

  gold: '#a59246',
  silver: '#666',
  bronze: '#6c382a',
  blue: '#00efff77',
  grey: '#333333cc',
  red: '#ce3636',
};

export const Settings = {
  showVideos: true,
  autoPlayVideos: true,
  statsPeriod: EStatsPeriod.CURRENT_ACT,
};

import {IAccountXPResponse} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/AccountXP.ts';

export const tempAccountXP: IAccountXPResponse = {
  Version: 1011,
  Subject: '92fc5f4b-de99-596c-9122-875625c115b4',
  Progress: {
    Level: 101,
    XP: 3582,
  },
  History: [
    {
      ID: '3bb3f6eb-c621-4b5f-b453-e11421c01b06',
      MatchStart: '2024-04-25T15:30:08Z',
      StartProgress: {
        Level: 101,
        XP: 3196,
      },
      EndProgress: {
        Level: 101,
        XP: 3582,
      },
      XPDelta: 386,
      XPSources: [
        {
          ID: 'time-played',
          Amount: 386,
        },
      ],
      XPMultipliers: [],
    },
    {
      ID: '06c11af6-de3f-463b-a2fa-ff054bca0ae7',
      MatchStart: '2024-05-05T12:46:01Z',
      StartProgress: {
        Level: 101,
        XP: 3582,
      },
      EndProgress: {
        Level: 101,
        XP: 3582,
      },
      XPDelta: 0,
      XPSources: [
        {
          ID: 'time-played',
          Amount: 81,
        },
      ],
      XPMultipliers: [
        {
          ID: 'penalty-modifier',
          Value: 0,
        },
      ],
    },
  ],
  LastTimeGrantedFirstWin: '2024-03-31T11:56:33.716621424Z',
  NextTimeFirstWinAvailable: '2024-04-01T09:56:33.716621424Z',
};

export enum EGameState {
  LOBBY = 'DEFAULT',
  PREGAME = 'PREGAME',
  IN_QUEUE = 'IN_QUEUE',
  IN_GAME = 'IN_GAME',
}

export enum EPartyState {
  LOBBY = 'DEFAULT', // Party Endpoint: in lobby and in game
  CUSTOM_GAME_SETUP = 'CUSTOM_GAME_SETUP',
  IN_QUEUE = 'MATCHMAKING',
  MATCHMADE_GAME_STARTING = 'MATCHMADE_GAME_STARTING',
}

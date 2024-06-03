import {IWeaponSkin} from './WeaponSkins';

export interface IWeaponsResponse {
  status: number;
  data: IWeapon[];
}

export interface IWeapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: IWeaponStats | null;
  shopData: IShopData | null;
  skins: IWeaponSkin[];
}

export interface IShopData {
  cost: number;
  category: string;
  shopOrderPriority: number;
  categoryText: string;
  gridPosition: IGridPosition | null;
  canBeTrashed: boolean;
  image: null;
  newImage: string;
  newImage2: null;
  assetPath: string;
}

export interface IGridPosition {
  row: number;
  column: number;
}

export interface IWeaponStats {
  fireRate: number;
  magazineSize: number;
  runSpeedMultiplier: number;
  equipTimeSeconds: number;
  reloadTimeSeconds: number;
  firstBulletAccuracy: number;
  shotgunPelletCount: number;
  wallPenetration: EWallPenetration;
  feature: null | string;
  fireMode: null | string;
  altFireType: EAltFireType | null;
  adsStats: IAdsStats | null;
  altShotgunStats: IAltShotgunStats | null;
  airBurstStats: IAirBurstStats | null;
  damageRanges: IDamageRange[];
}

export interface IAdsStats {
  zoomMultiplier: number;
  fireRate: number;
  runSpeedMultiplier: number;
  burstCount: number;
  firstBulletAccuracy: number;
}

export interface IAirBurstStats {
  shotgunPelletCount: number;
  burstDistance: number;
}

export enum EAltFireType {
  EWeaponAltFireDisplayTypeADS = 'EWeaponAltFireDisplayType::ADS',
  EWeaponAltFireDisplayTypeAirBurst = 'EWeaponAltFireDisplayType::AirBurst',
  EWeaponAltFireDisplayTypeShotgun = 'EWeaponAltFireDisplayType::Shotgun',
}

export interface IAltShotgunStats {
  shotgunPelletCount: number;
  burstRate: number;
}

export interface IDamageRange {
  rangeStartMeters: number;
  rangeEndMeters: number;
  headDamage: number;
  bodyDamage: number;
  legDamage: number;
}

export enum EWallPenetration {
  EWallPenetrationDisplayTypeHigh = 'EWallPenetrationDisplayType::High',
  EWallPenetrationDisplayTypeLow = 'EWallPenetrationDisplayType::Low',
  EWallPenetrationDisplayTypeMedium = 'EWallPenetrationDisplayType::Medium',
}

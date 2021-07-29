import { UUIDv4 } from '~/interfaces/uuidv4';
import { CollectionBase } from './collectionBase';

export type PlatformID = UUIDv4
export interface Platform {
  id: PlatformID,
  kontaObjectType: 'platform',
  name: string,
}

export type PlatformCollection = CollectionBase<Platform>
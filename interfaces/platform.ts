import { UUIDv4 } from '~/interfaces/uuidv4';
import { CollectionBase } from './collectionBase';

export interface Platform {
  id: UUIDv4,
  kontaObjectType: 'platform',
  name: string,
}

export type PlatformCollection = CollectionBase<Platform>
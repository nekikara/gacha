import { PlatformID } from './platform';
import { UUIDv4 } from '~/interfaces/uuidv4'
import { KontaID } from './konta';

export type TabID = UUIDv4
export type TabObjType = 'platform'
export type TabObjID = PlatformID
export interface Tab {
  id: TabID
  kontaId: KontaID
  tabObj: {
    type: TabObjType,
    id: TabObjID
  }
}
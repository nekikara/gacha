import { PlatformID } from './platform';
import { UUIDv4 } from '~/interfaces/uuidv4'
import { KontaID } from './konta';

export type TabID = UUIDv4
export type PaneObjID = PlatformID
export interface Tab {
  id: TabID
  kontaId: KontaID
  paneObjId: PaneObjID
}
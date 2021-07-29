import { PlatformID } from './platform';
import { UUIDv4 } from '~/interfaces/uuidv4'
import { KontaID } from './konta';

export type PaneID = UUIDv4

export interface Pane {
  id: PaneID
  tabs: Tab[]
}

export type TabID = UUIDv4
export interface Tab {
  id: TabID
  kontaId: KontaID
  platformId: PlatformID
}

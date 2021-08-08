import { PlatformID } from './platform'
import { UUIDv4 } from '~/interfaces/uuidv4'
import { KontaID } from './konta'

export type TabID = UUIDv4
export type TabObjectType = 'platform' | 'html_file'
export type TabObjectID = PlatformID
export interface TabObject {
  type: TabObjectType
  id: TabObjectID
}
export interface Tab {
  id: TabID
  kontaId: KontaID
  tabObj: TabObject
}

export interface TabCollection {
  kv: Record<TabID, Tab>
}

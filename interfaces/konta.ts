import { HTMLFile } from './htmlFile'
import { HTMLTag } from '~/interfaces/htmlTag'
import { Platform } from '~/interfaces/platform'
import { UUIDv4 } from '~/interfaces/uuidv4'

export type KontaID = UUIDv4
export type KontaObjectType = 'platform' | 'html_file' | 'html_tag'

export type KontaObject = Platform | HTMLFile | HTMLTag

export interface KontaObjectIdentity {
  id: UUIDv4
  type: KontaObjectType
}

export interface Konta {
  id: KontaID
  level: number
  obj: KontaObjectIdentity
  parent: KontaID | null
  children: KontaID[]
}

export interface KontaCollection {
  records: Record<KontaID, Konta>
  entries: KontaID[]
}

export interface ActiveKontaHistory {
  list: KontaID[]
  len: number
}

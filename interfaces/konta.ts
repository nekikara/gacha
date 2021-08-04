import { HTMLTag } from '~/interfaces/htmlTag'
import { Platform } from '~/interfaces/platform'
import { UUIDv4 } from '~/interfaces/uuidv4'

export type KontaID = UUIDv4
export type KontaObjectType = 'platform' | 'html_tag'

export type KontaObject = Platform | HTMLTag

export interface Konta {
  id: KontaID
  level: number
  obj: {
    id: UUIDv4
    type: KontaObjectType
  }
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

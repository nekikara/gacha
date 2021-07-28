import { HTMLTag } from '~/interfaces/htmlTag';
import { Platform } from '~/interfaces/platform';
import { UUIDv4 } from '~/interfaces/uuidv4'

export type KontaObjectType = 'platform' | 'html_tag'

export type KontaObject = Platform | HTMLTag

export interface Konta {
  id: UUIDv4
  level: number
  obj: {
    id: UUIDv4
    type: KontaObjectType
  }
  parent: UUIDv4 | null
  children: UUIDv4[]
}

export interface KontaCollection {
  records: Record<UUIDv4, Konta>
  entries: UUIDv4[]
}

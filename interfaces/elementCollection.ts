import { Element } from '~/interfaces/element'
import { UUIDv4 } from '~/interfaces/uuidv4';

export type ElementCollection = {
  kv: Record<UUIDv4, Element>
  order: UUIDv4[]
}

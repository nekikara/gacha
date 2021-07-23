import { Element, UUIDv4 } from '~/interfaces/element'

export type ElementCollection = {
  kv: Record<UUIDv4, Element>
  order: UUIDv4[]
}

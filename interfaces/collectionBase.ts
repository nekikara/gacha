import { UUIDv4 } from '~/interfaces/uuidv4'

export interface CollectionBase<T> {
  kv: Record<UUIDv4, T>,
  order: UUIDv4[]
}
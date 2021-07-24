import { Platform } from '~/interfaces/platform';
import { UUIDv4 } from '~/interfaces/uuidv4'

export type PlatformCollection = {
  kv: Record<UUIDv4, Platform>
  order: UUIDv4[]
}

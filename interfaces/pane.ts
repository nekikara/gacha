import { UUIDv4 } from '~/interfaces/uuidv4'

export type PaneID = UUIDv4

export interface PaneObj {
  id: PaneID
  index: number
  x: number
  w: number
}

export interface PaneObjCollection {
  kv: Record<PaneID, PaneObj>
  order: PaneID[]
}

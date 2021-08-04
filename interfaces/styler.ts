import { CollectionBase } from './collectionBase'
import { UUIDv4 } from '~/interfaces/uuidv4'

export interface StylerSize {
  position: {
    top: number
    left: number
  }
  width: number
  height: number
}

export interface Styler extends StylerSize {
  id: UUIDv4
}

export type StylerCollection = CollectionBase<Styler>

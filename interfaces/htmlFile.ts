import { Position } from './position'
import { CollectionBase } from './collectionBase'
import { UUIDv4 } from '~/interfaces/uuidv4'

export type HTMLFileID = UUIDv4

export interface HTMLFile {
  id: HTMLFileID
  kontaObjectType: 'html_file'
  name: string
  position: Position
}

export type HTMLFileCollection = CollectionBase<HTMLFile>

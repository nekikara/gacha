import { CollectionBase } from './collectionBase';
import { UUIDv4 } from '~/interfaces/uuidv4'

export interface ButtonTag {
  id: UUIDv4,
  tagType: 'button',
  content: string,
}

export type ButtonTagCollection = CollectionBase<ButtonTag>
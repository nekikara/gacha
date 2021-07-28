import { CollectionBase } from './collectionBase';
import { UUIDv4 } from '~/interfaces/uuidv4'

export type HTMlTagObjectType = 'button'

export interface HTMLTag {
  id: UUIDv4,
  kontaObjectType: 'html_tag',
  name: string,
  tagObj: {
    id: UUIDv4,
    type: HTMlTagObjectType,
  }
  styler: {
    id: UUIDv4,
  }
}

export type HTMLTagCollection = CollectionBase<HTMLTag>
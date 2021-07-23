import { v4 as uuidv4 } from 'uuid'

export type UUIDv4 = string;
export type ElementType = ButtonType | DivType | NoneType

export interface Element {
  id: UUIDv4,
  elementType: ElementType,
  position: {
    top: number,
    left: number
  }
  width: number
  height: number
}

export interface ButtonType {
  type: 'button',
  content: string
}

export interface NoneType {
  type: 'none'
}

export interface DivType {
  type: 'div',
  content: ElementType | ElementType[]
}

export const genElement = (type: 'button' | 'div') => {
  const elementType = genElementType(type)
  return {
    id: uuidv4(),
    elementType,
    position: {
      top: 0,
      left: 0
    },
    width: 0,
    height: 0
  }
}

const genElementType = (type: 'button' | 'div'): ElementType => {
  switch (type) {
    case 'button':
      return {
        type,
        content: 'button'
      } as ButtonType
    case 'div':
      return {
        type,
        content: { type: 'none' }
      } as DivType
    default:
      throw 'Not permitted to reach here';
  }

}
export type ElementType = ButtonType | 'div'
export interface Element {
  id: string | number,
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
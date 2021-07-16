export type ElementName = 'button' | 'div'
export interface Element {
  id: string | number,
  name: ElementName,
  position: {
    top: number,
    left: number
  }
  width: number
  height: number
}
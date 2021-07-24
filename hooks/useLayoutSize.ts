import { useState } from 'react';

export type LayoutSizeHook = {
  structureBarWidth: number,
  changeStructureBarWidth: (width: number) => void
}

export const useLayoutSize = (): LayoutSizeHook => {
  const [structureBarWidth, setStructureBarWidth] = useState<number>(250);

  return {
    structureBarWidth,
    changeStructureBarWidth: (width: number) => {
      setStructureBarWidth(() => {
        return width
      })
    },
  }
}
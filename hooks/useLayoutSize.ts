import { useRef, useState, useEffect } from 'react';

interface LayoutWidth {
  teamBox: number
  structureBox: number
  editorBox: number
}

export type LayoutSizeHook = {
  layoutWidth: LayoutWidth
  appContainerEl: React.Ref<HTMLDivElement> | null,
  changeStructureBarWidth: (diff: { x: number, y: number }) => void
}

export const useLayoutSize = (): LayoutSizeHook => {
  const appContainerEl = useRef<HTMLDivElement | null>(null)
  const [layoutWidth, setLayoutWidth] = useState<LayoutWidth>({ teamBox: 50, structureBox: 250, editorBox: 0 })

  useEffect(() => {
    if (appContainerEl.current) {
      const { width } = appContainerEl.current.getBoundingClientRect();
      const editorBox = width - (layoutWidth.structureBox + layoutWidth.teamBox)

      setLayoutWidth((oldLayoutWidth) => {
        return {
          ...oldLayoutWidth,
          editorBox
        }
      })
    }
  }, [appContainerEl])

  return {
    appContainerEl,
    layoutWidth,
    changeStructureBarWidth: (diff: { x: number, y: number }) => {
      setLayoutWidth((oldLayoutWidth: LayoutWidth) => {
        const strcutureBarBox = oldLayoutWidth.structureBox + diff.x
        const editorBarBox = oldLayoutWidth.editorBox - diff.x
        return { ...oldLayoutWidth, structureBox: strcutureBarBox, editorBox: editorBarBox }
      })
    },
  }
}
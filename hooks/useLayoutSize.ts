import { useRef, useState, useEffect, useCallback } from 'react';
import { PaneObjCollection } from '~/interfaces/pane';

interface LayoutWidth {
  teamBox: number
  structureBox: number
  editorBox: number,
  paneObjCollection: PaneObjCollection,
}

export type LayoutSizeHook = {
  layoutWidth: LayoutWidth
  appContainerEl: React.Ref<HTMLDivElement> | null,
  changeStructureBarWidth: (diff: { x: number, y: number }) => void
}

export const useLayoutSize = (): LayoutSizeHook => {
  const appContainerEl = useRef<HTMLDivElement | null>(null)
  const [layoutWidth, setLayoutWidth] = useState<LayoutWidth>({
    teamBox: 50,
    structureBox: 250,
    editorBox: 0,
    paneObjCollection: { kv: {}, order: [] }
  })

  const resizeLayoutWidth = useCallback(() => {
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
  }, [appContainerEl, layoutWidth])

  useEffect(() => {
    if (process.browser) {
      window.addEventListener('resize', () => {
        resizeLayoutWidth()
      })
    }
  }, [])

  useEffect(() => {
    resizeLayoutWidth()
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
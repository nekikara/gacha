import { PaneID } from './../interfaces/pane'
import { genUUIDv4 } from '~/utils/uuidGen'
import { useRef, useState, useEffect, useCallback } from 'react'
import { PaneObjCollection } from '~/interfaces/pane'

interface LayoutWidth {
  teamBox: number
  structureBox: number
  editorBox: number
  paneObjCollection: PaneObjCollection
}

export type LayoutSizeHook = {
  layoutWidth: LayoutWidth
  appContainerEl: React.Ref<HTMLDivElement> | null
  changeStructureBarWidth: (diff: { x: number; y: number }) => void
  addNewPaneIfFirst: () => PaneID
}

export const useLayoutSize = (): LayoutSizeHook => {
  const appContainerEl = useRef<HTMLDivElement | null>(null)
  const [layoutWidth, setLayoutWidth] = useState<LayoutWidth>({
    teamBox: 50,
    structureBox: 250,
    editorBox: 0,
    paneObjCollection: { kv: {}, order: [] },
  })

  const resizeLayoutWidth = useCallback(() => {
    if (appContainerEl.current) {
      const { width } = appContainerEl.current.getBoundingClientRect()
      const editorBox = width - (layoutWidth.structureBox + layoutWidth.teamBox)

      setLayoutWidth((oldLayoutWidth) => {
        return {
          ...oldLayoutWidth,
          editorBox,
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
    changeStructureBarWidth: (diff: { x: number; y: number }) => {
      setLayoutWidth((oldLayoutWidth: LayoutWidth) => {
        const strcutureBarBox = oldLayoutWidth.structureBox + diff.x
        const editorBarBox = oldLayoutWidth.editorBox - diff.x
        const paneLen = oldLayoutWidth.paneObjCollection.order.length
        const intDiff = Math.floor(diff.x / paneLen)
        const initial = diff.x % paneLen
        const paneObjCollection = oldLayoutWidth.paneObjCollection.order.reduce(
          (acc: PaneObjCollection, paneId, index: number) => {
            const d = index === 0 ? intDiff + initial : intDiff
            const obj = acc.kv[paneId]
            const x = index === 0 ? 0 : obj.x + d
            acc.kv[paneId] = { ...obj, x, w: obj.w - d }
            return acc
          },
          oldLayoutWidth.paneObjCollection
        )

        return {
          ...oldLayoutWidth,
          structureBox: strcutureBarBox,
          editorBox: editorBarBox,
          paneObjCollection,
        }
      })
    },
    addNewPaneIfFirst: (): PaneID => {
      if (layoutWidth.paneObjCollection.order.length !== 0) {
        return layoutWidth.paneObjCollection.order[0]
      }
      const newPane = {
        id: genUUIDv4(),
        index: 0,
        x: 0,
        w: layoutWidth.editorBox,
      }
      setLayoutWidth((oldLayoutWidth: LayoutWidth) => {
        const collection = {
          kv: {
            [newPane.id]: newPane,
          },
          order: [newPane.id],
        }
        return {
          teamBox: oldLayoutWidth.teamBox,
          structureBox: oldLayoutWidth.structureBox,
          editorBox: oldLayoutWidth.editorBox,
          paneObjCollection: collection,
        }
      })
      return newPane.id
    },
  }
}

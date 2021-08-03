import React, { useCallback, useMemo } from 'react'
import { KontaObject } from '~/interfaces/konta'
import { PaneID, PaneObj } from '~/interfaces/pane'
import { EditorEmpty } from './EditorParts/EditorEmpty'
import { EditorPane } from './EditorParts/EditorPane'

interface PaneCollectionFroEditorZone {
  kv: Record<PaneID, PaneObj>
  order: PaneID[]
}

type Props = {
  width: number
  activeKontaObject: KontaObject | null
  paneObjCollection: PaneCollectionFroEditorZone
}

export const EditorZone: React.VFC<Props> = ({ width, activeKontaObject, paneObjCollection }) => {
  const isEmpty = paneObjCollection.order.length === 0

  const genResizeEventHandler = (index: number) => {
    return (info: { x: number, y: number }) => {
      console.log(index, info)
    }
  }

  const renderPanes = (panes: PaneCollectionFroEditorZone) => {
    return paneObjCollection.order.map((paneId: PaneID) => {
      const paneObj = paneObjCollection.kv[paneId]
      return (
        <div
          key={paneObj.id}
          className="editorPaneFrame"
          style={{
            left: `${paneObj.x}px`,
            width: `${paneObj.w}px`
          }}
        >
          <EditorPane
            info={paneObj}
            onWidthChange={genResizeEventHandler(paneObj.index)}
          >
            pane{paneObj.index}
          </EditorPane>
        </div>
      )
    })
  }

  return (
    <>
      <div className="editorFrame">
        {isEmpty ? <EditorEmpty /> : renderPanes(paneObjCollection)}
      </div>
      <style jsx>{`
        .editorFrame {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
        }
        .editorPaneFrame {
          position: absolute;
          top: 0;
          height: 100%;
        }
      `}</style>
    </>
  )
}
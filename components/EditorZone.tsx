import React, { useEffect, useRef, useState } from 'react'
import { KontaObject } from '~/interfaces/konta'
import { PaneID } from '~/interfaces/pane'
import { genUUIDv4 } from '~/utils/uuidGen'
import { EditorPane, PaneInfo } from './EditorParts/EditorPane'

interface PaneStyle {
  x: number,
  w: number,
}

type PaneObj = PaneStyle & PaneInfo

interface PaneObjCollection {
  kv: Record<PaneID, PaneObj>
  order: PaneID[]
}

type Props = {
  width: number
  activeKontaObject: KontaObject | null
}

export const EditorZone: React.VFC<Props> = ({ width, activeKontaObject }) => {
  const [panes, setPanes] = useState<PaneObjCollection>({ kv: {}, order: [] });

  useEffect(() => {
    const paneNum = 1
    const halfW = width / paneNum;

    const kv = panes.kv
    const newOrder = []
    for (let i = 0; i < paneNum; i++) {
      const obj = {
        id: genUUIDv4(),
        index: i,
        x: halfW * i,
        w: halfW
      }
      kv[obj.id] = obj
      newOrder.push(obj.id)
    }

    setPanes({ kv, order: newOrder })
  }, [width, panes.kv])

  const genResizeEventHandler = (index: number) => {
    return (info: { x: number, y: number }) => {
      const leftPaneId = panes.order[index - 1]
      const leftPane = panes.kv[leftPaneId];

      const rightPaneId = panes.order[index]
      const rightPane = panes.kv[rightPaneId];

      const newLeft = { ...leftPane, w: leftPane.w + info.x }
      const newRight = { ...rightPane, x: rightPane.x + info.x, w: rightPane.w - info.x }

      const kv = panes.kv
      kv[leftPaneId] = newLeft
      kv[rightPaneId] = newRight;

      setPanes((oldPanes: PaneObjCollection) => {
        return { kv, order: oldPanes.order }
      })
    }
  }

  return (
    <>
      <div className="editorFrame">
        {panes.order.map((paneId: PaneID) => {
          const paneObj = panes.kv[paneId]
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
        })}
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
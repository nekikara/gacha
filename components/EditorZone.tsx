import React from 'react'
import { KontaObject } from '~/interfaces/konta'
import { genUUIDv4 } from '~/utils/uuidGen'
import { EditorPane, PaneInfo } from './EditorParts/EditorPane'

type Props = {
  activeKontaObject: KontaObject | null
}

export const EditorZone: React.VFC<Props> = ({ activeKontaObject }) => {
  const panes = [{ id: genUUIDv4(), index: 0 }, { id: genUUIDv4(), index: 1 }]
  return (
    <>
      <div className="editorFrame">
        {panes.map((info: PaneInfo) => (
          <EditorPane key={info.id} info={info}>
            pane{info.index}
          </EditorPane>
        ))}
      </div>
      <style jsx>{`
        .editorFrame {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}
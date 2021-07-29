import React from 'react'
import { KontaObject } from '~/interfaces/konta'

type Props = {
  activeKontaObject: KontaObject | null
}

export const EditorZone: React.VFC<Props> = ({ activeKontaObject }) => {
  return (
    <>
      <div className="editorFrame">
        {activeKontaObject?.name}
      </div>
      <style jsx>{`
        .editorFrame {
          position: relative;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}
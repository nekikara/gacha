import React from 'react'

type Props = {}

export const EditorZone: React.VFC<Props> = ({ }) => {
  return (
    <>
      <div className="editorFrame">
        EditorZone
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
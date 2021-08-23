import React from 'react'

interface Props {}

export const HTMLFileEditorToolBox: React.VFC<Props> = ({}) => {
  return (
    <>
      <div className="htmlFileEditorToolBox">ToolBox</div>
      <style jsx>{`
        .htmlFileEditorToolBox {
          width: 100%;
        }
      `}</style>
    </>
  )
}

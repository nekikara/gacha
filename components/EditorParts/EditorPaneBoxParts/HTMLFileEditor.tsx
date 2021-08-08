import React from 'react'

interface Props {}

export const HTMLFileEditor: React.VFC<Props> = ({}) => {
  return (
    <>
      <div className="editorHTMLFileBoard">
        <div>HTMLFileEditor</div>
      </div>
      <style jsx>{`
        .editorHTMLFileBoard {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  )
}

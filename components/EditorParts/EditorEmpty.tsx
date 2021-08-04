import React from 'react'

export const EditorEmpty: React.VFC = () => {
  return (
    <>
      <div className="editorEmptyFrame">Empty</div>
      <style jsx>{`
        .editorEmptyFrame {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

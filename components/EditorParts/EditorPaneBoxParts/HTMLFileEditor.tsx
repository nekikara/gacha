import React from 'react'
import { useTransformation } from './useTransformation'
interface Size {
  w: number
  h: number
}

interface Props {}

export const HTMLFileEditor: React.VFC<Props> = ({}) => {
  const { boardRef, canvasInnerRef, screenBaseRef, screenRef } =
    useTransformation()

  return (
    <>
      <div ref={boardRef} className="editorHTMLFileBoard">
        <div ref={canvasInnerRef} className="canvasInner">
          <div ref={screenBaseRef} className="screenBase">
            <div ref={screenRef} className="screen">
              <main className="setupFrame">HTMLFileEditor</main>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .editorHTMLFileBoard {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          overflow: scroll;
        }
        .canvasInner {
          position: relative;
          border: 100000px solid transparent;
          box-sizing: border-box;
          display: block;
        }
        .screenBase {
          position: absolute;
          height: auto;
          transform-origin: left top;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .screen {
          position: absolute;
        }
        .setupFrame {
          background-color: rgba(24, 150, 100, 0.3);
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

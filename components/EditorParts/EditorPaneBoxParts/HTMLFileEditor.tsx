import React, { useEffect, useRef, useState } from 'react'

interface Size {
  w: number
  h: number
}

interface Props {}

export const HTMLFileEditor: React.VFC<Props> = ({}) => {
  const canvasInnerRef = useRef<HTMLDivElement | null>(null)
  const screenBaseRef = useRef<HTMLDivElement | null>(null)
  const [containerSize, setContainerSize] = useState<Size>({
    w: 0,
    h: 0,
  })
  const [screenBaseSize, setScreenBaseSize] = useState<Size>({ w: 0, h: 0 })
  useEffect(() => {
    if (canvasInnerRef.current) {
      canvasInnerRef.current.scrollTo(100000, 100000)
      const { width, height } = canvasInnerRef.current.getBoundingClientRect()
      setContainerSize(() => ({ w: width, h: height }))
    }
  }, [canvasInnerRef])
  useEffect(() => {
    const screenBase = screenBaseRef.current
    if (screenBase) {
      const { width, height } = screenBase.getBoundingClientRect()
      setScreenBaseSize(() => ({ w: width, h: height }))
    }
  }, [screenBaseRef])
  return (
    <>
      <div ref={canvasInnerRef} className="editorHTMLFileBoard">
        <div className="canvasInner">
          <div
            ref={screenBaseRef}
            className="screenBase"
            style={{
              transform: `translate(${
                (containerSize.w - screenBaseSize.w) / 2
              }px, ${(containerSize.h - screenBaseSize.h) / 2}px) scale(1)`,
            }}
          >
            HTMLFileEditor
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
          transform-origin: left top;
          top: 0;
          left: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

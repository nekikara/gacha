import React, { useEffect, useRef } from 'react'
import { Position } from '~/interfaces/position'

interface Size {
  w: number
  h: number
}

interface Props {}

export const HTMLFileEditor: React.VFC<Props> = ({}) => {
  const canvasInnerRef = useRef<HTMLDivElement | null>(null)
  const screenBaseRef = useRef<HTMLDivElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('======')
    let screenWidth = 360
    let scale = 1.0
    const containerSize = { w: 0, h: 0 }
    const canvasInnerScrollPosition: Position = { x: 100000, y: 100000 }

    const canvasInner = canvasInnerRef.current
    const screenBase = screenBaseRef.current
    const screen = screenRef.current

    function transformScreenBase() {
      if (screenBase) {
        const translateSize = {
          w: containerSize.w - screenWidth,
          h: containerSize.h,
        }
        const translateStr = `translate(${translateSize.w / 2}px, ${
          translateSize.h / 2
        }px)`
        screenBase.style.transform = `${translateStr} scale(${scale})`
      }
    }

    if (canvasInner) {
      canvasInner.scrollTo(
        canvasInnerScrollPosition.x,
        canvasInnerScrollPosition.y
      )
      const { width, height } = canvasInner.getBoundingClientRect()
      containerSize.w = width
      containerSize.h = height
      canvasInner.addEventListener(
        'wheel',
        function (ev: WheelEvent) {
          ev.preventDefault()
          if (ev.ctrlKey) {
            console.log('==== point', { x: ev.clientX, y: ev.clientY })
            const newScale = scale - ev.deltaY * 0.01
            scale = newScale > 0.05 ? newScale : 0.05
            transformScreenBase()
          } else {
            canvasInnerScrollPosition.x += ev.deltaX
            canvasInnerScrollPosition.y += ev.deltaY
            canvasInner.scrollTo(
              canvasInnerScrollPosition.x,
              canvasInnerScrollPosition.y
            )
          }
        },
        { passive: false }
      )
    }

    if (screen) {
      screen.style.width = `${screenWidth}px`
      transformScreenBase()
    }
  }, [canvasInnerRef, screenRef, screenBaseRef])

  return (
    <>
      <div ref={canvasInnerRef} className="editorHTMLFileBoard">
        <div className="canvasInner">
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

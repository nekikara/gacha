import React, { useEffect, useRef } from 'react'

type Props = {
  onBarMove: (info: { x: number, y: number }) => void
}

export const ResizeEmitter: React.VFC<Props> = ({ onBarMove }) => {
  const handleEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let startX = 0;
    const emitMoving = (clientX: number) => {
      const width = clientX - startX
      startX = clientX
      onBarMove({ x: width, y: 0 })
    }

    const down = (e: MouseEvent) => {
      startX = e.clientX
      window.document.body.style.cursor = 'ew-resize'
      lastWidthUpdatedTime = Date.now()
      window.addEventListener('mousemove', move, true)
      window.addEventListener('mouseup', up, true)
    }
    let lastWidthUpdatedTime = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now()
      const diff = now - lastWidthUpdatedTime
      if (diff > 30) {
        emitMoving(e.clientX)
        lastWidthUpdatedTime = now;
      }
    }
    const up = (e: MouseEvent) => {
      emitMoving(e.clientX)
      window.document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', move, true)
      window.removeEventListener('mouseup', up, true)
    }
    let handleElCurrent = handleEl.current
    if (!!handleElCurrent) {
      handleElCurrent.addEventListener('mousedown', down)
    }
    return () => {
      handleElCurrent?.removeEventListener('mousedown', down)
    }
  }, [handleEl, onBarMove])

  return (
    <>
      <div
        ref={handleEl}
        className="handle"
      >
      </div>
      <style jsx>{`
        .handle {
          width: 100%;
          height: 100%;
        }
        .handle:hover, .handle:active {
          cursor: ew-resize;
        }
      `}</style>
    </>
  )
}
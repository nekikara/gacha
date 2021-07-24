import React, { useEffect, useRef, useState } from 'react'

type Props = {
  originX: number
  onWidthChanged: (width: number) => void
}

export const StructureBarResizer: React.VFC<Props> = ({ originX, onWidthChanged }) => {
  const handleEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateWidth = (clientX: number) => {
      const width = clientX - originX
      onWidthChanged(width)
    }

    let lastWidthUpdatedTime = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now()
      const diff = now - lastWidthUpdatedTime
      if (diff > 80) {
        updateWidth(e.clientX)
        lastWidthUpdatedTime = now;
      }
    }
    const up = (e: MouseEvent) => {
      updateWidth(e.clientX)
      window.document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', move, true)
      window.removeEventListener('mouseup', up, true)
    }
    const down = () => {
      window.document.body.style.cursor = 'ew-resize'
      lastWidthUpdatedTime = Date.now()
      window.addEventListener('mousemove', move, true)
      window.addEventListener('mouseup', up, true)
    }
    let handleElCurrent = handleEl.current
    if (!!handleElCurrent) {
      handleElCurrent.addEventListener('mousedown', down)
    }
    return () => {
      handleElCurrent?.removeEventListener('mousedown', down)
    }
  }, [handleEl, originX, onWidthChanged])

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
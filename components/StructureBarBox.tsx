import React, { useEffect, useRef, useState } from 'react'

type Props = {
  onWidthChanged: (width: number) => void
}

type DragState = 'none' | 'started';

export const StrutureBarBox: React.VFC<Props> = ({ onWidthChanged }) => {
  const [containerX, setContainerX] = useState<number>(0);
  const [dragState, setDragState] = useState<DragState>('none');
  const [lastWidthUpdateTime, setLastWidthUpdateTime] = useState<number>(0);
  const containerEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!!containerEl.current) {
      const rect = containerEl.current.getBoundingClientRect()
      setContainerX(rect.left)
    }
  }, [])

  const updateWidth = (clientX: number) => {
    const width = clientX - containerX
    onWidthChanged(width)
  }

  const move = (e: MouseEvent) => {
    if (dragState === 'started') {
      const now = Date.now()
      const diff = now - lastWidthUpdateTime
      if (diff > 25) {
        updateWidth(e.clientX)
        setLastWidthUpdateTime(() => now)
      }
    }
  }

  const up = (e: MouseEvent) => {
    if (dragState === 'started') {
      updateWidth(e.clientX)
    }
    window.document.body.style.cursor = 'auto'
    setDragState(() => 'none')
    window.removeEventListener('mousemove', move)
  }

  const handleMouseDown = () => {
    window.document.body.style.cursor = 'ew-resize'
    setLastWidthUpdateTime(() => Date.now())
    setDragState(() => 'started')
  }

  useEffect(() => {
    if (dragState === 'started') {
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    } else {
      window.removeEventListener('mouseup', up)
    }
  }, [dragState])

  return (
    <>
      <div
        ref={containerEl}
        className="container"
      >
        <div className="layers">
          <h3>Projects</h3>
        </div>
        <div
          className="handle"
          onMouseDown={handleMouseDown}
        >
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          background-color: #555;
        }
        .layers {
          flex: 1;
          height: 100%;
        }
        .handle {
          width: 8px;
          height: 100%;
          transform: translateX(4px);
        }
        .handle:hover, .handle:active {
          cursor: ew-resize;
        }
      `}</style>
    </>
  )
}
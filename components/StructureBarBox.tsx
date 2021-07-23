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

  const handleDragStart = () => {
    setLastWidthUpdateTime(() => Date.now())
  }

  const handleDrag = (e: React.MouseEvent) => {
    const now = Date.now()
    const diff = now - lastWidthUpdateTime
    if (diff > 20 && e.clientX > 0) {
      updateWidth(e.clientX)
      setLastWidthUpdateTime(() => now)
    }
  }

  const handleDragEnd = (e: React.MouseEvent) => {
    updateWidth(e.clientX)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setLastWidthUpdateTime(() => Date.now())
    setDragState('started')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    console.log('mouseMOve')
    if (dragState === 'started') {
      const now = Date.now()
      const diff = now - lastWidthUpdateTime
      if (diff > 20 && e.clientX > 0) {
        updateWidth(e.clientX)
        setLastWidthUpdateTime(() => now)
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    console.log('mouseup')
    if (dragState === 'started') {
      updateWidth(e.clientX)
    }
    setDragState('none')
  }

  return (
    <>
      <div
        ref={containerEl}
        className="container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="layers">
          <h3>Projects</h3>
        </div>
        <div
          className="handle"
          onMouseDown={handleMouseDown}
        // onMouseLeave={handleMouseLeave}
        // onDragStart={handleDragStart}
        // onDrag={handleDrag}
        // onDragEnd={handleDragEnd}
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
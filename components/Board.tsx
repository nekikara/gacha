import React, { useState } from 'react'
import { SideMenu } from '~/components/SideMenuBar'

type MouseState = 'none' | 'started' | 'moved'
type Origin = {
  top: number;
  left: number;
}

interface Element {
  name: 'button' | 'div'
  position: {
    top: number,
    left: number
  }
  width: number
  height: number
}

type Props = {
  mode: SideMenu
}

export const Board: React.VFC<Props> = ({ mode }) => {
  const [mouseState, setMouseState] = useState<MouseState>('none');
  const [origin, setOrigin] = useState<Origin>({ top: 0, left: 0 })
  const [element, setElement] = useState<Element | null>(null);

  const handleStart = (e: React.MouseEvent) => {
    setMouseState('started')
    const currentRect = e.currentTarget.getBoundingClientRect();
    const top = e.clientY - currentRect.top
    const left = e.clientX - currentRect.left
    setOrigin({ top, left })
    const elem: Element = {
      name: mode === 'button' ? 'button' : 'div',
      position: { top, left },
      width: 0,
      height: 0
    }
    setElement(elem);
  }
  const handleMove = (e: React.MouseEvent) => {
    if (mouseState === 'started') {
      setMouseState('moved')
    }
    if (mouseState === 'moved') {
      const currentRect = e.currentTarget.getBoundingClientRect();
      const top = e.clientY - currentRect.top
      const left = e.clientX - currentRect.left
      const newTop = origin.top < top ? origin.top : top;
      const newLeft = origin.left < left ? origin.left : left;
      const width = Math.abs(origin.left - left)
      const height = Math.abs(origin.top - top)

      const elem: Element = {
        name: element!.name,
        position: {
          top: newTop,
          left: newLeft
        },
        width: width,
        height: height
      }

      setElement(elem)
    }
  }
  const handleEnd = () => {
    if (mouseState === 'started') {
      setElement(null);
    }
    setMouseState('none');
  }

  const renderCurrent = () => {
    if (element) {
      const style: React.CSSProperties = {
        position: 'absolute',
        top: element.position.top,
        left: element.position.left,
        width: `${element.width}px`,
        height: `${element.height}px`
      }
      return (
        <button type="button" style={style}>
          {element.width > 0 && element.height > 0 ? 'button' : ''}
        </button>
      )
    }
  }

  return (
    <>
      <div className="boardFrame" onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd}>
        {renderCurrent()}
      </div>
      <style jsx>{`
        .boardFrame {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid #111;
        }
      `}</style>
    </>
  )
}
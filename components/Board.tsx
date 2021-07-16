import React, { useState } from 'react'
import { SideMenu } from '~/components/SideMenuBar'
import { Element, ElementName } from '~/interfaces/element'

function calcElement(current: Element, clientPos: { y: number, x: number }, rect: Origin, origin: Origin) {
  const top = clientPos.y - rect.top
  const left = clientPos.x - rect.left
  const newTop = origin.top < top ? origin.top : top;
  const newLeft = origin.left < left ? origin.left : left;
  const width = Math.abs(origin.left - left)
  const height = Math.abs(origin.top - top)

  const elem: Element = {
    id: current.id,
    name: current.name,
    position: {
      top: newTop,
      left: newLeft
    },
    width: width,
    height: height
  }
  return elem
}

type MouseState = 'none' | 'started' | 'moved'
type Origin = {
  top: number;
  left: number;
}

type Props = {
  mode: SideMenu
  elements: Element[]
  onNewElement: (elem: Element) => void;
}

export const Board: React.VFC<Props> = ({ mode, elements, onNewElement }) => {
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
      id: Date.now(),
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
      const elem = calcElement(element!, { x: e.clientX, y: e.clientY }, currentRect, origin)
      setElement(elem)
    }
  }
  const handleEnd = (e: React.MouseEvent) => {
    if (mouseState === 'started') {
      setElement(null);
    } else {
      const currentRect = e.currentTarget.getBoundingClientRect();
      const elem = calcElement(element!, { x: e.clientX, y: e.clientY }, currentRect, origin)
      onNewElement(elem)
      setElement(null)
    }
    setMouseState('none');
  }

  const renderElement = (elem: Element) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: elem.position.top,
      left: elem.position.left,
      width: `${elem.width}px`,
      height: `${elem.height}px`
    }
    return (
      <button key={elem.id} type="button" style={style}>
        {elem.width > 0 && elem.height > 0 ? 'button' : ''}
      </button>
    )
  }

  const renderCurrent = () => {
    if (element) {
      return renderElement(element)
    }
  }

  return (
    <>
      <div className="boardFrame" onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd}>
        {elements.map((elem: Element) => {
          return renderElement(elem)
        })}
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
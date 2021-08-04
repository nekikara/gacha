import React, { useState } from 'react'
import { SideMenu } from '~/components/SideMenuBar'
import {
  Element,
  ElementCollection,
  genElement,
} from '~/components/BoardParts/element'
import { UUIDv4 } from '~/interfaces/uuidv4'
import { BoardItemContainer } from './BoardParts/BoardItemContainer'
import { ElementTypeElement } from './BoardParts/ElementTypeElement'

function calcElement(
  current: Element,
  clientPos: { y: number; x: number },
  rect: Origin,
  origin: Origin
) {
  const top = clientPos.y - rect.top
  const left = clientPos.x - rect.left
  const newTop = origin.top < top ? origin.top : top
  const newLeft = origin.left < left ? origin.left : left
  const width = Math.abs(origin.left - left)
  const height = Math.abs(origin.top - top)

  const styleInfo = {
    position: {
      top: newTop,
      left: newLeft,
    },
    width: width,
    height: height,
  }

  const elem: Element = {
    id: current.id,
    elementType: current.elementType,
    styleInfo,
  }
  return elem
}

type MouseState = 'none' | 'started' | 'moved'
type Origin = {
  top: number
  left: number
}

type Props = {
  mode: SideMenu
  elementCollection: ElementCollection
  onNewElement: (elem: Element) => void
  onElementContentChanged: (info: { id: UUIDv4; title: string }) => void
}

export const Board: React.VFC<Props> = ({
  mode,
  elementCollection,
  onNewElement,
  onElementContentChanged,
}) => {
  const [waiting, setWaiting] = useState<boolean>(true)
  const [mouseState, setMouseState] = useState<MouseState>('none')
  const [origin, setOrigin] = useState<Origin>({ top: 0, left: 0 })
  const [element, setElement] = useState<Element | null>(null)

  const handleStart = (e: React.MouseEvent) => {
    if (!waiting) return
    setMouseState('started')
    const currentRect = e.currentTarget.getBoundingClientRect()
    const top = e.clientY - currentRect.top
    const left = e.clientX - currentRect.left
    setOrigin({ top, left })
    const initializedElement = genElement(mode)
    const elem: Element = {
      ...initializedElement,
      styleInfo: {
        position: { top, left },
        width: initializedElement.styleInfo.width,
        height: initializedElement.styleInfo.height,
      },
    }
    setElement(elem)
  }
  const handleMove = (e: React.MouseEvent) => {
    if (!waiting) return
    if (mouseState === 'started') {
      setMouseState('moved')
    }
    if (mouseState === 'moved') {
      const currentRect = e.currentTarget.getBoundingClientRect()
      const elem = calcElement(
        element!,
        { x: e.clientX, y: e.clientY },
        currentRect,
        origin
      )
      setElement(elem)
    }
  }

  const handleEnd = (e: React.MouseEvent) => {
    if (!waiting || mouseState === 'none') return
    if (mouseState === 'started') {
      setElement(null)
    } else {
      const currentRect = e.currentTarget.getBoundingClientRect()
      const elem = calcElement(
        element!,
        { x: e.clientX, y: e.clientY },
        currentRect,
        origin
      )
      onNewElement(elem)
      setElement(null)
    }
    setMouseState('none')
  }

  const renderElement = (current: boolean, elem: Element) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: elem.styleInfo.position.top,
      left: elem.styleInfo.position.left,
      width: `${elem.styleInfo.width}px`,
      height: `${elem.styleInfo.height}px`,
    }
    return (
      <BoardItemContainer key={elem.id} style={style}>
        <ElementTypeElement
          current={current}
          elementType={elem.elementType}
          onFocus={() => setWaiting(false)}
          onLeave={() => setWaiting(true)}
          onChange={(title: string) => {
            onElementContentChanged({ id: elem.id, title })
          }}
        />
      </BoardItemContainer>
    )
  }

  const renderCurrent = () => {
    if (element) {
      return renderElement(true, element)
    }
  }

  return (
    <>
      <div
        className="boardFrame"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
      >
        {elementCollection.order.map((uuid: UUIDv4) => {
          return renderElement(false, elementCollection.kv[uuid])
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

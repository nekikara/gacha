import React, { useEffect, useRef, useState } from 'react'
import { HTMLFile } from '~/interfaces/htmlFile'
import { PlatformToolID } from '~/interfaces/platformTool'
import { Position } from '~/interfaces/position'
import { PlatformToolPallet } from './PlatformEditorParts/PlatformToolPallet'

interface Props {
  htmlFiles: HTMLFile[]
  onPlatformToolAdd: (menuId: PlatformToolID, position: Position) => void
}

export const PlatformEditor: React.VFC<Props> = ({
  htmlFiles,
  onPlatformToolAdd,
}) => {
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [clientPositionAsOrigin, setClientPositionAsOrigin] =
    useState<Position>({ x: 0, y: 0 })

  useEffect(() => {
    if (boardRef.current) {
      const boardOrigin = boardRef.current.getBoundingClientRect()
      const half = { w: boardOrigin.width / 2, h: boardOrigin.height / 2 }
      setClientPositionAsOrigin(() => ({ x: half.w, y: half.h }))
    }
  }, [boardRef])

  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault()
  }
  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault()
    if (boardRef.current) {
      const data = ev.dataTransfer.getData('text')
      const menuId = parseInt(data) as PlatformToolID
      const boardOrigin = boardRef.current.getBoundingClientRect()
      const position = {
        x: ev.clientX - boardOrigin.left,
        y: ev.clientY - boardOrigin.top,
      }
      const insertingPosition = {
        x: position.x - clientPositionAsOrigin.x,
        y: position.y - clientPositionAsOrigin.y,
      }
      onPlatformToolAdd(menuId, insertingPosition)
    }
  }
  return (
    <>
      <div className="editorPlatformBoard">
        <div
          ref={boardRef}
          className="board"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {htmlFiles.map((htmlFile: HTMLFile, idx: number) => {
            return (
              <div
                key={`${htmlFile.position.x}_${htmlFile.position.y}_${idx}`}
                className="htmlFile"
                style={{
                  top: `${
                    htmlFile.position.y + clientPositionAsOrigin.y - 50
                  }px`,
                  left: `${
                    htmlFile.position.x + clientPositionAsOrigin.x - 100
                  }px`,
                }}
              >
                {htmlFile.name}
              </div>
            )
          })}
        </div>
        <div className="toolPallet">
          <PlatformToolPallet
            onSelect={(toolId: PlatformToolID) => console.log(toolId)}
          />
        </div>
      </div>
      <style jsx>{`
        .editorPlatformBoard {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }
        .board {
          height: 100%;
          flex: 1;
        }
        .htmlFile {
          position: absolute;
          width: 200px;
          height: 100px;
          border: 1px solid rgb(100, 100, 100);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .toolPallet {
          height: 100%;
          width: 50px;
        }
      `}</style>
    </>
  )
}

import React, { useRef, useState } from 'react'
import { PlatformToolID } from '~/interfaces/platformTool'
import { PlatformToolPallet } from './PlatformEditorParts/PlatformToolPallet'

interface Props {}

export const PlatformEditor: React.VFC<Props> = ({}) => {
  const [htmlFiles, setHTMLFiles] = useState<{ x: number; y: number }[]>([])
  const boardRef = useRef<HTMLDivElement | null>(null)

  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault()
  }
  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault()
    if (boardRef.current) {
      const boardOrigin = boardRef.current.getBoundingClientRect()
      const data = ev.dataTransfer.getData('text')
      const position = { x: ev.clientX, y: ev.clientY }
      const insertingPosition = {
        x: position.x - boardOrigin.x,
        y: position.y - boardOrigin.y,
      }
      setHTMLFiles((old) => {
        return [...old, insertingPosition]
      })
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
          {htmlFiles.map((htmlFile: { x: number; y: number }, idx: number) => {
            return (
              <div
                key={`${htmlFile.x}_${htmlFile.y}_${idx}`}
                className="htmlFile"
                style={{
                  top: `${htmlFile.y - 50}px`,
                  left: `${htmlFile.x - 100}px`,
                  backgroundColor: '#FF0000',
                }}
              ></div>
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
        }
        .toolPallet {
          height: 100%;
          width: 50px;
        }
      `}</style>
    </>
  )
}

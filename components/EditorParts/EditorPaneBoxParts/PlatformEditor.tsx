import React, { DragEventHandler } from 'react'
import { PlatformToolID } from '~/interfaces/platformTool'
import { PlatformToolPallet } from './PlatformEditorParts/PlatformToolPallet'

interface Props {}

export const PlatformEditor: React.VFC<Props> = ({}) => {
  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault()
  }
  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault()
    const data = ev.dataTransfer.getData('text')
    const position = { x: ev.clientX, y: ev.clientY }
    console.log('dropPosition', position, data)
  }
  return (
    <>
      <div className="editorPlatformBoard">
        <div
          className="board"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        ></div>
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
        .toolPallet {
          height: 100%;
          width: 50px;
        }
      `}</style>
    </>
  )
}

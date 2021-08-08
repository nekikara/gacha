import React, { useEffect, useState } from 'react'
import { PlatformTool, PlatformToolID } from '~/interfaces/platformTool'
import { platformToolMenus } from '~/utils/platformToolMenu'

type Props = {
  onSelect: (tooId: PlatformToolID) => void
}

export const PlatformToolPallet: React.VFC<Props> = ({ onSelect }) => {
  const [img, setImage] = useState<HTMLImageElement>(new Image())

  useEffect(() => {
    const image = new Image()
    image.src = '/images/tools/html_file_tool.svg'
    setImage(image)
  }, [])

  const handleSelect = (toolId: PlatformToolID) => {
    return (ev: React.DragEvent) => {
      console.log('event', ev)
      ev.dataTransfer.setData('text/plain', `${toolId}`)
      ev.dataTransfer.setDragImage(
        img,
        img.naturalWidth / 2,
        img.naturalHeight / 2
      )
      ev.dataTransfer.effectAllowed = 'move'
    }
  }

  return (
    <>
      <div className="toolPalletFrame">
        <ul className="tools">
          {platformToolMenus.map((menu: PlatformTool) => {
            return (
              <li key={menu.id} className="toolItem">
                <div
                  id={`x${menu.id}`}
                  className="item"
                  draggable={true}
                  onDragStart={handleSelect(menu.id)}
                >
                  {menu.sig}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        .toolPalletFrame {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 100, 255, 1);
        }
        .tools {
          width: 100%;
          height: 100%;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px 0;
        }
        .toolItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 4px;
          background-color: rgb(150, 150, 150);
          height: 40px;
          width: 40px;
        }
        .toolItem:hover {
          cursor: move;
          user-select: none;
          background-color: rgb(70, 70, 70);
          color: rgb(255, 255, 255);
        }
        .item {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}

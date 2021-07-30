import clsx from 'clsx'
import React from 'react'
import { UUIDv4 } from '~/interfaces/uuidv4'
import { ResizeEmitter } from '../shared/ResizeEmitter'

type PaneInfoID = UUIDv4
export interface PaneInfo {
  id: PaneInfoID
  index: number
}

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  info: PaneInfo,
  onWidthChange: (info: { x: number, y: number }) => void
  children: React.ReactNode
}

export const EditorPane: React.VFC<Props> = ({ info, onWidthChange, children }) => {
  const moreThanSecondPane = info.index > 0
  const paneCls = clsx('editorPaneFrame', moreThanSecondPane && 'editorBorder')
  const handleWidthChange = (info: { x: number, y: number }) => {
    onWidthChange(info)
  }
  return (
    <>
      <div className={paneCls}>
        {!moreThanSecondPane
          ? null
          : (
            <div className="editorResizer">
              <ResizeEmitter onBarMove={handleWidthChange} />
            </div>
          )
        }
        {children}
      </div>
      <style jsx>{`
        .editorPaneFrame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .editorPaneFrame.editorBorder {
          border-left: 1px solid black;
        }
        .editorResizer {
          position: absolute;
          left: -4px;
          width: 8px;
          height: 100%;
        }
      `}</style>
    </>
  )
}
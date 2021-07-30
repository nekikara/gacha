import clsx from 'clsx'
import React from 'react'
import { UUIDv4 } from '~/interfaces/uuidv4'

type PaneInfoID = UUIDv4
export interface PaneInfo {
  id: PaneInfoID
  index: number
}

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  info: PaneInfo,
  children: React.ReactNode
}

export const EditorPane: React.VFC<Props> = ({ info, children }) => {
  const moreThanSecondPane = info.index > 0
  const paneCls = clsx('editorPaneFrame', moreThanSecondPane && 'editorBorder')
  return (
    <>
      <div className={paneCls}>
        {info.index < 1 ? null : (<div>resizer</div>)}
        {children}
      </div>
      <style jsx>{`
        .editorPaneFrame {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
        }
        .editorPaneFrame.editorBorder {
          border-left: 1px solid black;
        }
      `}</style>
    </>
  )
}
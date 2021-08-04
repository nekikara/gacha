import clsx from 'clsx'
import React from 'react'

interface TabItem {
  name: string
  active: boolean
}
interface Props {
  tabItem: TabItem
}

export const EditorTabItem: React.VFC<Props> = ({ tabItem }) => {
  const itemCls = clsx('editorTabItemFrame', tabItem.active && 'active')
  return (
    <>
      <div className={itemCls}>{tabItem.name}</div>
      <style jsx>{`
        .editorTabItemFrame {
          user-select: none;
          position: relative;
          height: 100%;
          background-color: rgba(50, 50, 50, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          color: rgba(200, 200, 200, 1);
        }
        .editorTabItemFrame.active {
          color: rgba(255, 20, 20, 1);
        }
      `}</style>
    </>
  )
}

import clsx from 'clsx'
import React from 'react'
import { HTMLFileCollection } from '~/interfaces/htmlFile'
import { KontaObject } from '~/interfaces/konta'
import { PlatformCollection } from '~/interfaces/platform'
import { Tab, TabID, TabObject } from '~/interfaces/tab'
import { EditorTabItem } from './EditorTabParts/EditorTabItem'

interface Props {
  tabs: Tab[]
  platformCollection: PlatformCollection
  htmlFileCollection: HTMLFileCollection
  activeKontaObject: KontaObject | null
  onTabSelect: (tabId: TabID) => void
}

export const EditorTabBox: React.VFC<Props> = ({
  activeKontaObject,
  tabs,
  platformCollection,
  htmlFileCollection,
  onTabSelect,
}) => {
  const handleTabSelector = (tabId: TabID) => {
    return () => {
      onTabSelect(tabId)
    }
  }
  const getKontaObj = (tabObj: TabObject): KontaObject => {
    let collection = null
    switch (tabObj.type) {
      case 'platform':
        collection = platformCollection
        break
      case 'html_file':
        collection = htmlFileCollection
    }
    return collection!.kv[tabObj.id]
  }
  return (
    <>
      <div className="editorTabBoxFrame">
        {tabs.map((tab: Tab, idx: number) => {
          let obj = null
          switch (tab.tabObj.type) {
            case 'platform':
            case 'html_file':
              const kontaObj = getKontaObj(tab.tabObj)
              const isActive =
                activeKontaObject?.kontaObjectType === tab.tabObj.type &&
                activeKontaObject?.id === tab.tabObj.id
              obj = { id: tab.id, name: kontaObj.name, active: isActive }
              break
            default:
              break
          }
          const tabCls = clsx('tabFrame', idx > 0 && 'sep')
          return !obj ? null : (
            <div
              key={obj.id}
              className={tabCls}
              onClick={handleTabSelector(tab.id)}
            >
              <EditorTabItem tabItem={{ name: obj.name, active: obj.active }} />
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .editorTabBoxFrame {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(128, 128, 128, 1);
          display: flex;
          align-items: center;
        }
        .editorTabBoxFrame:hover {
          cursor: pointer;
        }
        .tabFrame {
          height: 100%;
        }
        .tabFrame.sep {
          border-left: 1px solid rgba(220, 220, 220, 0);
        }
      `}</style>
    </>
  )
}

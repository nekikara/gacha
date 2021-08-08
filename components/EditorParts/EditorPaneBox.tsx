import React from 'react'
import { HTMLFileCollection, HTMLFileID } from '~/interfaces/htmlFile'
import { KontaObject, KontaObjectIdentity } from '~/interfaces/konta'
import { PaneID, PaneObjCollection } from '~/interfaces/pane'
import { PaneTabRankCollection } from '~/interfaces/paneTabRank'
import { PlatformCollection } from '~/interfaces/platform'
import { PlatformToolID } from '~/interfaces/platformTool'
import { Position } from '~/interfaces/position'
import { TabCollection, TabID } from '~/interfaces/tab'
import { EditorPane } from './EditorPaneBoxParts/EditorPane'
import { EditorTabBox } from './EditorPaneBoxParts/EditorTabBox'
import { PlatformEditor } from './EditorPaneBoxParts/PlatformEditor'

export interface PlatfromToolCreation {
  kontaObjectIdentity: KontaObjectIdentity
  menuId: PlatformToolID
  position: Position
}
interface Props {
  activeKontaObject: KontaObject | null
  paneObjCollection: PaneObjCollection
  paneTabRankCollection: PaneTabRankCollection
  tabCollection: TabCollection
  platformCollection: PlatformCollection
  htmlFileCollection: HTMLFileCollection
  onTabSelect: (tabId: TabID) => void
  onNewPlatformTool: (platformToolCreation: PlatfromToolCreation) => void
}

export const EditorPaneBox: React.VFC<Props> = ({
  activeKontaObject,
  paneObjCollection,
  paneTabRankCollection,
  platformCollection,
  tabCollection,
  htmlFileCollection,
  onTabSelect,
  onNewPlatformTool,
}) => {
  const htmlFiles = htmlFileCollection.order.map((htmlFileId: HTMLFileID) => {
    return htmlFileCollection.kv[htmlFileId]
  })

  const genResizeEventHandler = (index: number) => {
    return (info: { x: number; y: number }) => {
      console.log(index, info)
    }
  }

  const handleTabSelect = (tabId: TabID) => {
    onTabSelect(tabId)
  }

  const handlePlatformToolAdd = (
    menuId: PlatformToolID,
    position: Position
  ) => {
    onNewPlatformTool({
      kontaObjectIdentity: {
        id: activeKontaObject!.id,
        type: activeKontaObject!.kontaObjectType,
      },
      menuId,
      position,
    })
  }
  return (
    <>
      {paneObjCollection.order.map((paneId: PaneID) => {
        const paneObj = paneObjCollection.kv[paneId]
        const ranks = paneTabRankCollection.kv[paneId]
        const tabs = []
        for (let i = 1; i <= ranks.last; i++) {
          const rank = ranks.kv[i]
          const tab = tabCollection.kv[rank.tabId]
          tabs.push(tab)
        }
        return (
          <div
            key={paneObj.id}
            className="editorPaneFrameInZone"
            style={{
              left: `${paneObj.x}px`,
              width: `${paneObj.w}px`,
            }}
          >
            <EditorPane
              info={paneObj}
              onWidthChange={genResizeEventHandler(paneObj.index)}
            >
              <div className="tabFrame">
                <EditorTabBox
                  activeKontaObject={activeKontaObject}
                  tabs={tabs}
                  platformCollection={platformCollection}
                  onTabSelect={handleTabSelect}
                />
              </div>
              <div className="editor">
                <PlatformEditor
                  htmlFiles={htmlFiles}
                  onPlatformToolAdd={handlePlatformToolAdd}
                />
              </div>
            </EditorPane>
          </div>
        )
      })}
      <style jsx>{`
        .editorPaneFrameInZone {
          position: absolute;
          top: 0;
          height: 100%;
        }
        .tabFrame {
          width: 100%;
          height: 32px;
        }
        .editor {
          width: 100%;
          height: calc(100% - 32px);
        }
      `}</style>
    </>
  )
}
